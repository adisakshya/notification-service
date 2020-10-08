import {CommonModule} from "@common/common.module";
import {Module} from '@nestjs/common';
import {DeviceController} from "@device/device.controller";
import {DeviceService} from "@device/device.service";
import {FireBase} from "@common/firebase/firebase";

@Module({
    providers: [FireBase, DeviceService],
    controllers: [DeviceController],
    imports: [CommonModule],
    exports: [DeviceService]
})
export class DeviceModule {
}
