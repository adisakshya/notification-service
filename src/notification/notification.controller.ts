import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RedisContext } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  private reminderJobMap = new Map<string, string | number>();
  private readonly logger: Logger = new Logger();
  constructor(@InjectQueue('notification') private readonly notificationQueue: Queue) {}

  @EventPattern('create')
  async create(@Payload() reminder: any) {
    this.logger.debug(`Creating notification for user ${reminder.userId}`);
    
    // Set delay time
    const delay = new Date(reminder.date).getTime() - new Date().getTime();
    
    // Set payload
    const payload = {
      id: reminder.id,
      userId: reminder.userId
    }
    
    // Schedule notification
    const job = await this.notificationQueue.add('create', payload, { delay: delay });
    // Set reminder-id and job-id in map
    this.reminderJobMap.set(reminder.id, job.id);

    this.logger.debug(`Created notification for user ${reminder.userId}`);
  }

  @EventPattern('delete')
  async delete(@Payload() reminder: any) {
    this.logger.debug(`Deleting notification for user ${reminder.userId}`);
    
    // Check if notification processing job for the given reminder exists
    const notificationJob = this.notificationQueue.getJob(this.reminderJobMap.get(reminder.id));
    (await notificationJob).remove()
    
    // Clear reminder-id and job-id in map
    this.reminderJobMap.delete(reminder.id);

    this.logger.debug(`Deleted notification for user ${reminder.userId}`);
  }
}