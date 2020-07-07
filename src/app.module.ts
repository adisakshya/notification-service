import {Module} from "@nestjs/common";
import {PingModule} from "./ping/ping.module";
import {DeviceModule} from "@device/device.module";

@Module({
    imports: [
        PingModule,
        DeviceModule
    ]
})
export class AppModule {
}
