export class Reminder {
    id: string;
    userId: string;
    userEmail: string;
    date: Date;
    notifyOffset: number;
    notifyType: "push" | "email";
    message: string;
    url: URL;
}

export class Tokens {
    web: string[];
    android: string[];
}

export class PushNotificationData {
    notification: {
        title: string;
        body: string;
        icon: string;
        click_action: string;
    };
    data: {
        type: string,
        args: string;
    };
}

export class EmailNotificationData {
    email: string;
    subject: string;
    body: Reminder
}
