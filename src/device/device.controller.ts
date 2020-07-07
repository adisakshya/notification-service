import {
    Controller,
    Delete,
    Get,
    Post,
    Param,
    Query
} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { error } from "console";
import {ReadHeader, WriteHeader} from "@common/decorator";
import { ReadHeaders, PagingResponse, PagingQuery, WriteHeaders, CreateEntityResponse } from '@common/dto';
import {ApiCommonHeader} from "@common/swagger";
import { DeviceService } from './device.service';
import { AllDevicesResponse } from './device.dto';

@ApiCommonHeader()
@ApiTags("Devices")
@Controller('device')
export class DeviceController {

    constructor(private readonly deviceService: DeviceService) {}

    @ApiOperation({
        summary: "Fetch all devices",
        operationId: "device:read_all",
        description: "Fetch all devices for the user"
    })
    @Get()
    public async getDevices(@ReadHeader() header: ReadHeaders): Promise<AllDevicesResponse> {
        return await this.deviceService.findAll(header.userId); 
    }

    @ApiOperation({
        summary: "Register a device",
        operationId: "device:register",
        description: "Register new device for a user"
    })
    @Post("register/:fcmToken")
    public registerDevice(@WriteHeader() header: WriteHeaders, @Param("fcmTokem") fcmToken: string): Promise<CreateEntityResponse> {
        return this.deviceService.create(header.userId, fcmToken);
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
        description: "Deregister an existing device for a user"
    })
    @Delete("remove/:id")
    public async delete(): Promise<any> {
        throw error('Not implemented yet');
    }
}

