import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('notification')
export class NotificationController {
  constructor(@InjectQueue('notification') private readonly notificationQueue: Queue) {}

  @Post('create')
  async transcode() {
    await this.notificationQueue.add('create', {
      name: 'My Notification'
    });
  }
}