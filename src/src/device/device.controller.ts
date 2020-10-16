import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Param
} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {ReadHeader, WriteHeader} from "@common/decorator";
import {ReadHeaders, WriteHeaders, CreateEntityResponse} from '@common/dto';
import {ApiCommonHeader} from "@common/swagger";
import {DeviceService} from './device.service';
import {AllDevicesResponse, RegisterDevice} from './device.dto';

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
    public async getAllDevices(@ReadHeader() header: ReadHeaders): Promise<AllDevicesResponse> {
        return await this.deviceService.findAllDevices(header.userId); 
    }

    @ApiOperation({
        summary: "Register a device",
        operationId: "device:register",
        description: "Register new device for a user"
    })
    @Post("register")
    public registerDevice(@WriteHeader() header: WriteHeaders, @Body() device: RegisterDevice): Promise<CreateEntityResponse> {
        return this.deviceService.createDevice(header.userId, device);
    }

    @ApiOperation({
        summary: "Deregister a device",
        operationId: "device:deregister",
        description: "Deregister an existing device for a user"
    })
    @Delete("remove/:id")
    public async deleteDevice(@WriteHeader() header: WriteHeaders, @Param("id") id: string): Promise<void> {
        await this.deviceService.deleteDevice(header.userId, id);
    }
}

