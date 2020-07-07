import {ApiConfigService} from "@common/api-config.service";
import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

@Module({
    providers: [Logger, ApiConfigService],
    exports: [Logger, ApiConfigService],
    imports:[ConfigModule.forRoot()]
})
export class CommonModule {
}
