import {Injectable, Logger} from '@nestjs/common';
import * as admin from 'firebase-admin';
import App = admin.app.App;

@Injectable()
export class FireBase {
    private readonly logger = new Logger("Firebase");
    /**
     * Stringified Firebase config
     */
    private readonly projectsConfig = process.env.FCM_PROJECT_CONFIG;
    private readonly app: App;

    constructor() {
        const serviceAccount = JSON.parse(this.projectsConfig);
        this.app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        }, "app");
    }

    async verifyToken(fcmToken: string): Promise<boolean> {
        this.logger.log("Verifying token");
        return await this.app.messaging().send({token: fcmToken}, true)
            .then(() => true)
            .catch(() => false);
    }

    async sendPushNotification(tokens: string[], notification: any): Promise<admin.messaging.MessagingDevicesResponse> {
        this.logger.log("Sending notification")
        const message = {...notification};
        return this.app.messaging().sendToDevice(tokens, message);
    }

}
