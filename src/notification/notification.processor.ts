import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { FireBase } from '@common/firebase/firebase';
import { DeviceService } from '@device/device.service';

@Processor('notification')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);
  constructor(private readonly _firebase: FireBase,
              private readonly deviceService: DeviceService) {
    this._firebase.configure();
  }

  @Process('create')
  async handleCreate(job: Job) {
    // Get userId
    const userId = job.data.userId;
    this.logger.debug(`Sending notification to user ${userId}`);
    // Fetch FCM tokens for the user
    const userDevices = await this.deviceService.findAll(userId);
    const fcmtokens = userDevices.devices.map((device) => {
      return device.fcmToken;
    });
    // Send notification
    const notification = await this.handleNotification(fcmtokens);
    this.logger.debug(notification);
    this.logger.debug(`Sent notification to user ${userId}`);
  }

  async handleNotification(fcmTokens: string[]): Promise<any> {
      const data = {
        "notification": {
          "title": "FCM Notification Title",
          "body": "This is FCM Message body...",
          "icon": "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
        }
      }
      return await this._firebase.sendNotification(fcmTokens, data);
  }

}