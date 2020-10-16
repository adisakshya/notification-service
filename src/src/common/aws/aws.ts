import { Injectable, Logger } from '@nestjs/common';
import { EmailNotification } from './aws.types';
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSHandler {
    private readonly logger = new Logger('AWS Handler');
    private readonly ses = new AWS.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1'
    });
    private readonly sesEmailTemplateName = 'EmailNotificationTemplate';
    private sourceEmail = null;
    
    constructor () {
        this.logger.log('Setting source email for SES');
        this.sourceEmail = 'notification@adisakshya.co';
    }

    async sendEmailNotification(emailNotificationData: EmailNotification): Promise<void> {
        const emailMessageConfig = {
            Source: this.sourceEmail,
            Template: this.sesEmailTemplateName,
            TemplateData: JSON.stringify(emailNotificationData),
            Destination: {
                ToAddresses: [emailNotificationData.email]
            }
        };
        await this.ses.sendTemplatedEmail(emailMessageConfig)
            .promise()
            .then((data) => {
                this.logger.log(`Email sent to ${emailNotificationData.email}`);
                return data;
            })
            .catch((error) => {
                this.logger.error(`Failed sending email to ${emailNotificationData.email}`);
                this.logger.error(error);
                return false;
            });
    }
}
