import {ApiConfigService} from "@common/api-config.service";
import {FireBase} from "@common/firebase/firebase";
import {AWSHandler} from "@common/aws/aws";
import {Logger, Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {BoomExceptionFilter} from "./expection-filter/boom-filter";

@Module({
    providers: [Logger, BoomExceptionFilter, ApiConfigService, FireBase, AWSHandler],
    exports: [Logger, ApiConfigService, FireBase, AWSHandler],
    imports: [ConfigModule.forRoot()]
})
export class CommonModule {
}
