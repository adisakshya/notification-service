import {AWSHandler} from '@common/aws/aws';
import {FireBase} from '@common/firebase/firebase';
import {DeviceService} from '@device/device.service';
import {Device} from '@device/device.dto';
import {Injectable, Logger} from '@nestjs/common';
import {EmailNotificationData, PushNotificationData, Tokens} from './notification.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger("Notification Service");
  constructor(private readonly aws: AWSHandler,
              private readonly firebase: FireBase,
              private readonly deviceService: DeviceService) {}

  public async processPushNotification(userId: string, pushNotificationData: PushNotificationData): Promise<void> {
    this.logger.log("Getting all user devices");
    const userDevices = await this.deviceService.findAllDevices(userId);
    const fcmTokens = {
      "web": [],
      "android": []
    };
    this.logger.log(`User ${userId} has ${userDevices.devices.length} devices registered`);
    userDevices.devices.forEach((device) => {
      if(device.type === "web") {
        fcmTokens.web.push(device.fcmToken);
      }
      if(device.type === "android") {
        fcmTokens.android.push(device.fcmToken);
      }
    });
    await this.handlePushNotification(fcmTokens, pushNotificationData, userDevices.devices, userId);
    this.logger.log(`Sent push notification to user ${userId}`);
  }

  public async processEmailNotification(userId: string, emailNotificationData: EmailNotificationData): Promise<void> {
    this.logger.log(`Sending email notification to user ${userId}`);
    await this.handleEmailNotification(emailNotificationData);
    this.logger.log(`Sent email notification to user ${userId}`);
  }

  private async handlePushNotification(fcmTokens: Tokens, notificationData: PushNotificationData, devices: Device[], userId: string): Promise<void> {
    if(!(fcmTokens.web.length || fcmTokens.android.length)) {
      return;
    }
    for (const deviceType in fcmTokens) {
      if (fcmTokens.hasOwnProperty(deviceType)) {
        switch(deviceType) {
          case 'web': await this.sendWebPushNotification(fcmTokens[deviceType], notificationData, devices, userId);
                      break;
          case 'android': await this.sendAndroidPushNotification(fcmTokens[deviceType], notificationData, devices, userId);
                          break;
          default: this.logger.error(`Unknown device type ${deviceType}`);
                   break;
        }
      }
    }
  }

  private async sendWebPushNotification(fcmTokens: string[], notificationData: PushNotificationData, devices: Device[], userId: string): Promise<void> {
    if(!fcmTokens?.length) {
      return;
    }
    const notification = await this.firebase.sendPushNotification(fcmTokens, {
      "notification": notificationData.notification,
      "data": notificationData.data
    });
    await this.handleNotificationFailure(userId, fcmTokens, notification, devices);
  }

  private async sendAndroidPushNotification(fcmTokens: string[], notificationData: PushNotificationData, devices: Device[], userId: string): Promise<void> {
    if(!fcmTokens?.length) {
      return;
    }
    const notification = await this.firebase.sendPushNotification(fcmTokens, {
      "data": notificationData.data
    });
    await this.handleNotificationFailure(userId, fcmTokens, notification, devices);
  }

  private async handleNotificationFailure(userId: string, fcmTokens: string[], notification: any, devices: Device[]): Promise<void> {
    if(notification.failureCount) {
      // If some notifications failed to send
      const results = notification.results;
      for(let i=0; i<results.length; i++) {
        const errorResponse = results[i]?.error;
        // Check if error-response is invalid-token or un-registered device
        if(errorResponse?.code === "messaging/invalid-registration-token" || errorResponse?.code === "messaging/registration-token-not-registered") {
          // If yes, then find and remove that device
          this.logger.error(`Found an invalid FCM token or an unregistered device of user ${userId}`);
          const device = devices.filter((device) => {
            return device.fcmToken === fcmTokens[i];
          })[0];
          await this.deviceService.deleteDevice(userId, device.id);
        }
      }
    }
  }

  private async handleEmailNotification(notificationData: EmailNotificationData): Promise<void> {
    const emailData = {
      email: notificationData.email,
      subject: notificationData.subject,
      body: {
        userName: notificationData.body.userEmail || '',
        title: 'Reminder notification',
        url: notificationData.body.url,
        message: notificationData.body.message
      }
    }
    await this.aws.sendEmailNotification(emailData);
  }

}
