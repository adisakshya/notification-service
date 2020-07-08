import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationProcessor } from './notification.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
      redis: {
        host: '192.168.99.100',
        port: 6379,
      },
  }),
  ],
  controllers: [NotificationController],
  providers: [NotificationProcessor],
})
export class NotificationModule {}