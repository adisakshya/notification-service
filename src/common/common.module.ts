import {ApiConfigService} from "@common/api-config.service";
import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {BoomExceptionFilter} from "./expection-filter/boom-filter";

@Module({
    providers: [Logger, BoomExceptionFilter, ApiConfigService],
    exports: [Logger, ApiConfigService],
    imports:[ConfigModule.forRoot()]
})
export class CommonModule {
}
