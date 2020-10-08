import {CommonModule} from "@common/common.module";
import {ApiConfigService} from "@common/api-config.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {DeviceModule} from "@device/device.module";
import {NotificationModule} from '@notification/notification.module';
import {Device} from "@entity/device.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (config: ApiConfigService) => ({
                type: 'postgres',
                username: config.dbUser,
                database: config.dbName,
                password: config.dbPassword,
                host: config.dbHost,
                entities: [Device],
                logging: !config.isProduction,
                synchronize: false,
            }),
            imports: [CommonModule],
            inject: [ApiConfigService]
        }),
        NotificationModule, DeviceModule
    ]
})
export class AppModule {
}
