import { ApiProperty } from '@nestjs/swagger';

export class Device {
    @ApiProperty({
        type: String,
        description: "Device ID (FCM token)",
        required: true
    })
    deviceId: string;
}

export interface UserDevice {
    userId: string;
    devices: Array<Device>
}