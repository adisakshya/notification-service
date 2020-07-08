import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('notification')
export class NotificationProcessor {
  private readonly logger = new Logger(NotificationProcessor.name);

  @Process('create')
  handleCreate(job: Job) {
    this.logger.debug('Start creation...');
    this.logger.debug(job.data);
    this.logger.debug('Creation completed');
  }
}