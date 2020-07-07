import {Injectable, Logger} from "@nestjs/common";

/**
 * Service managing all the functionalities related to devices
 */
@Injectable()
export class DeviceService {
    constructor(private readonly logger: Logger) {}

    /**
     * Creates a new deivce for a user
     */
    public async create(): Promise<any> {
        return null;
    }

    /**
     * Update the given device ID for a user
     */
    public async update(): Promise<any> {
        return null;
    }

    /**
     * Deletes a device for a user
     */
    public async delete(): Promise<any> {
        return null;
    }

    /**
     * Fetch all the registered devices for the user
     */
    public async findAll(): Promise<any> {
        return null;
    }
}
