import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationProcessor } from './notification.processor';
import { FireBase } from '@common/firebase/firebase';
import { DeviceModule } from '@device/device.module'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
      redis: {
        host: '192.168.99.100',
        port: 6379,
      },
    }),
    DeviceModule
  ],
  controllers: [NotificationController],
  providers: [NotificationProcessor, FireBase],
})
export class NotificationModule {}