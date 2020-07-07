import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApiConfigService {

    constructor(private readonly configService: ConfigService) {
    }

    get region(): string {
        return this.configService.get('ECS_REGION') ?? 'us-east-1';
    }

    get isProduction(): boolean {
        return this.configService.get<string>('NODE_ENV') === 'production';
    }

    get userDeviceTable():string{
        return this.configService.get<string>('USERDEVICE_DYNAMO_TABLE') ?? 'savd-dev-userdevice-table';
    }
}