import {
    Controller,
    Delete,
    Get,
    Post,
    UseInterceptors
} from '@nestjs/common';
import {ApiOperation, ApiTags,} from "@nestjs/swagger";
import { error } from "console";

@ApiTags("Devices")
@Controller('device')
export class DeviceController {

    constructor() {
    }

    @ApiOperation({
        summary: "Fetch all devices",
        operationId: "device:read_all",
        description: "Fetch all devices for the user"
    })
    @Get()
    public async getDevices(): Promise<any> {
        throw error('Not implemented yet');
    }

    @ApiOperation({
        summary: "Register a device",
        operationId: "device:register",
        description: "Register new device for a user"
    })
    @Post("register/:id")
    public registerDevice(): Promise<any> {
        throw error('Not implemented yet');
    }

    @ApiOperation({
        summary: "Update device ID",
        operationId: "device:update",
        description: "Update the device ID for a user"
    })
    @Post("update")
    public updateDevice(): Promise<any> {
        throw error('Not implemented yet');
    }

    @ApiOperation({
        summary: "Deregister a device",
        operationId: "device:deregister",
        description: "Dergister an existing device for a user"
    })
    @Delete("remove/:id")
    public async delete(): Promise<any> {
        throw error('Not implemented yet');
    }
}

