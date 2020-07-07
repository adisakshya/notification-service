import {CommonModule} from "@common/common.module";
import {ApiConfigService} from "@common/api-config.service";
import {Module} from '@nestjs/common';
import {DeviceController} from "@device/device.controller";
import {DeviceService} from "@device/device.service";
import * as AWS from "aws-sdk";
import {DeviceRepo} from "@device/device.repo";
import {Logger} from "@nestjs/common";

@Module({
    providers: [
        {
            provide: DeviceRepo,
            inject: [Logger, ApiConfigService],
            useFactory: (logger: Logger, config: ApiConfigService) => new DeviceRepo(
                new AWS.DynamoDB.DocumentClient({
                    "apiVersion": "2012-08-10",
                    "accessKeyId": "adisakshyaAccessKey",
                    "secretAccessKey": "adisakshyaSecretKey",
                    "region":"us-east-1",
                    "endpoint": "http://192.168.99.100:8000"
                }),
                logger,
                config.userDeviceTable,
            ),
        },
        DeviceService
    ],
    controllers: [DeviceController],
    imports: [CommonModule],
    exports: [DeviceService]
})
export class DeviceModule {
}
