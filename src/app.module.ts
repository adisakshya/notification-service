import {Module} from "@nestjs/common";
import {PingModule} from "./ping/ping.module";
import {DeviceModule} from "@device/device.module";
import {NotificationModule} from '@notification/notification.module';

@Module({
    imports: [
        NotificationModule,
        PingModule,
        DeviceModule
    ]
})
export class AppModule {
}
