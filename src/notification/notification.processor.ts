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

  @Process('REMINDER_CREATE')
  async handleCreate(job: Job) {
    // Get userId
    const userId = job.data.userId;
    this.logger.debug(`Sending notification to user ${userId}`);
    // Fetch FCM tokens for the user
    const userDevices = await this.deviceService.findAllDevices(userId);
    const fcmtokens = userDevices.devices.map((device) => {
      return device.fcmToken;
    });
    // Send notification
    const notification = await this.handleNotification(fcmtokens, job.data.notificationData);
    this.logger.debug(`Sent notification to user ${userId}`);
  }

  /**
   * Handle sending notifications to users
   */
  async handleNotification(fcmTokens: string[], notificationData: Object): Promise<any> {
      return await this._firebase.sendNotification(fcmTokens, {
        "notification": notificationData
      });
  }

}