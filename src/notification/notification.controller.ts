import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { EventPattern, Payload, Ctx, RedisContext } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  constructor(@InjectQueue('notification') private readonly notificationQueue: Queue) {}

  @EventPattern('create')
  async create(@Payload() reminder: any, @Ctx() context: RedisContext) {
    console.log(`Channel: ${context.getChannel()}`);
    
    // Set delay time
    const delay = new Date(reminder.date).getTime() - new Date().getTime();
    
    // Set payload
    const payload = {
      id: reminder.id,
      userId: reminder.userId
    }
    
    // Schedule notification
    await this.notificationQueue.add('create', payload, { delay: delay });
  }
}