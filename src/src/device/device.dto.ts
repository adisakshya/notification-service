import {ApiProperty} from "@nestjs/swagger";
import {IsIn, IsNotEmpty, IsString} from "class-validator";

export class RegisterDevice {
    @ApiProperty({
        description: "FCM token for the device that is to be registered",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    fcmToken: string;

    @ApiProperty({
        enum: ["web", "android"],
        description: "Type of device, that needs to be registered",
        required: true
    })
    @IsIn(["web", "android"])
    @IsNotEmpty()
    type: "web" | "android";

    @ApiProperty({
        description: "Name of device",
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class Device {
    id: string;
    fcmToken: string;
    type: string;
    name: string;
    createdAt: string;
}

export class AllDevicesResponse {
    devices: Array<Device>
}
