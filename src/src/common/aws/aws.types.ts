export class EmailNotification {
    email: string;
    subject: string;
    body: {
        userName: string;
        title: string;
        url: URL;
        message: string;
    }
}