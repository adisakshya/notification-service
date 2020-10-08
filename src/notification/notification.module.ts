import {Module} from '@nestjs/common';
import {NotificationController} from './notification.controller';
import {NotificationService} from './notification.service';
import {DeviceModule} from '@device/device.module'
import {CommonModule} from "@common/common.module";

@Module({
    imports: [DeviceModule, CommonModule],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {
}
