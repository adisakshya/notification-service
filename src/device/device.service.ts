import { Injectable, Logger } from "@nestjs/common";
import { CreateEntityResponse } from "@common/dto";
import { AllDevicesResponse } from "./device.dto";
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

        /**
         * ToDo Verify FCM Token
         */
        
        // Check if a device with this fcmToken already exists
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
    public async delete(userId: string, fcmToken: string): Promise<void> {
        this.logger.log(`Deassociating deivce for user ${userId}`);
        
        /**
         * ToDo Verify FCM Token
         */
        
         // Get all devices that remain associated with the user
        let userDevices = await this.deviceRepo.findDeviceByUserId(userId);
        if(!userDevices) {
            throw Boom.badData('No devices avaible', { reason: 'NO_DEVICES_AVAILABLE' });
        }
        const deviceToRemainAssociated = userDevices.filter((device) => {
            if(device.fcmToken === fcmToken) {
                return false;
            }
            return true;
        });
        if(userDevices.length === deviceToRemainAssociated.length) {
            throw Boom.badData('Device not associated', { reason: 'DEVICES_NOT_ASSOCIATED' });
        }
        // Update assoiated device lists
        await this.deviceRepo.update(userId, deviceToRemainAssociated);
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
