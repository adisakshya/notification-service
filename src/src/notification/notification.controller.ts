import {Controller} from '@nestjs/common';
import {Logger} from '@nestjs/common';
import {Reminder} from "./notification.dto";
import {Consumer} from 'sqs-consumer';
import {NotificationService} from "@notification/notification.service";

@Controller('notification')
export class NotificationController {
    private readonly logger = new Logger("Notification Controller");
    private readonly app = Consumer.create({
        queueUrl: process.env.NOTIFICATION_QUEUE_URL,
        handleMessage: async (message) => {
            await this.handleReminderEvent(message);
        }
    })
    .on('error', (err) => {
        this.logger.error(err);
    })
    .on('processing_error', (err) => {
        this.logger.error(err);
    })
    .on('timeout_error', (err) => {
        this.logger.error(err);
    });

    constructor(private readonly notificationService: NotificationService) {
        this.app.start();
        this.logger.log(`SQS Consumer Running: ${this.app.isRunning}`);
    }

    private async handleReminderEvent(message): Promise<void> {
        this.logger.log('Received reminder event');
        const eventData = JSON.parse(message.Body);
        if (!eventData?.MessageAttributes?.eventType) {
            // Error
            return;
        }
        switch (eventData.MessageAttributes.eventType.Value) {
            case 'reminder:created':
                await this.create(JSON.parse(eventData.Message));
                break;
            default:
                this.logger.error('Unknown event-type');
        }
    }

    async create(reminder: Reminder): Promise<void> {
        this.logger.log(`Sending notification for user ${reminder.userId}`);
        const pushPayload = {
            notification: {
                title: 'Reminder',
                body: reminder.message,
                icon: 'https://img.icons8.com/windows/96/2266EE/alarm-clock.png',
                click_action: reminder.url.toString()
            },
            data: {
                type: 'REMINDER_NOTIFICATION',
                args: JSON.stringify({
                    userId: reminder.userId,
                    url: reminder.url
                })
            }
        };
        const emailPayload = {
            email: reminder.userEmail,
            subject: 'Reminder',
            body: reminder
        };
        switch (reminder.notifyType) {
            case 'push':
                await this.notificationService.processPushNotification(reminder.userId, pushPayload);
                break;
            case 'email':
                await this.notificationService.processEmailNotification(reminder.userId, emailPayload);
                break;
            default:
                this.logger.error('Unkown notification-type');
        }
        this.logger.log(`Sent notification to user ${reminder.userId}`);
    }
}
