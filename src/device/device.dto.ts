import { ApiProperty } from '@nestjs/swagger';

export class Device {
    deviceId: string;
    fcmToken: string;
    createdAt: string;
}

export interface UserDevice {
    userId: string;
    devices: Array<Device>
}

export class AllDevicesResponse {
    devices: Array<Device>
}