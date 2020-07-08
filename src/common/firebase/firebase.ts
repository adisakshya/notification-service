import { Injectable } from '@nestjs/common';
import { credential, initializeApp, messaging } from 'firebase-admin';
import { messagingConfiguration }from './firebase-config';
import { ProjectConfiguration } from './firebase.type';
import { Boolean } from 'aws-sdk/clients/apigateway';

@Injectable()
export class FireBase {
    /**
     * Get all defined projects
     */
    private projects(): Array<ProjectConfiguration> {
        return messagingConfiguration.projects as ProjectConfiguration[];
    }

    /**
     * Configure firebase-admin
     */
    configure(): void {
        const data = this.projects().forEach(project => {
            // Initialize application
            const ref = initializeApp({
                credential: credential.cert(project.serviceAccount),
                databaseURL: project.databaseURL,
            });
        });
    }

    /**
     * Verify FCM-Token
     */
    async verifyToken(fcmToken: string): Promise<Boolean> {
        return await messaging().send({
            token: fcmToken
        }, true)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
    }
}