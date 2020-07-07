import {Injectable, Logger} from "@nestjs/common";
import {PagingQuery, CreateEntityResponse} from "@common/dto";
import { Device, AllDevicesResponse } from "./device.dto";
import { DeviceRepo } from "./device.repo";
import { customAlphabet } from "nanoid";
import { plainToClass } from "class-transformer";
import Boom = require("@hapi/boom");

/**
 * Service managing all the functionalities related to devices
 */
@Injectable()
export class DeviceService {
    private readonly generateID = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 22);
    
    constructor(private readonly deviceRepo: DeviceRepo,
                private readonly logger: Logger) {}

    /**
     * Creates a new deivce for a user
     */
    public async create(userId: string, fcmToken: string): Promise<CreateEntityResponse> {
        this.logger.log(`Registering device for user ${userId}`);
        
        // Use device-repo to check if a device with this fcmToken already exists
        let userDevices = await this.deviceRepo.findDeviceByUserId(userId);
        if(userDevices) {
            userDevices.forEach((device) => {
                if(device.fcmToken === fcmToken) {
                    throw Boom.badData("Device already registered", {reason: "DEVICE_ALREADY_REGISTERED"});
                }
            });
        }

        // Use device-repo to create new device for the user
        const createdDevice = await this.deviceRepo.create(userId, fcmToken, userDevices);
        return plainToClass(CreateEntityResponse, {
            id: createdDevice
        });
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
    public async findAll(userId: string): Promise<AllDevicesResponse> {
        this.logger.log(`Finding all deivces for user ${userId}`);
        const userDevices = await this.deviceRepo.findDeviceByUserId(userId);
        return plainToClass(AllDevicesResponse, {
            "devices": userDevices ||  []
        });
    }
}
