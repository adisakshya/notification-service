import {Module} from '@nestjs/common';
import {CommonModule} from "@common/common.module";
import {DeviceModule} from '@device/device.module'
import {NotificationController} from './notification.controller';
import {NotificationService} from './notification.service';

@Module({
    imports: [
        DeviceModule,
        CommonModule
    ],
    controllers: [NotificationController],
    providers: [NotificationService]
})
export class NotificationModule {
}
