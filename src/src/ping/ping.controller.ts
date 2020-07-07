import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags("Ping")
@Controller()
export class PingController {
    constructor(private readonly pingService: PingService) {}

    @Get('/ping')
    getPing(): object {
        return this.pingService.ping();
    }
}