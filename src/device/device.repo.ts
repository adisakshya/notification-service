import { Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { customAlphabet } from "nanoid";
import { UserDevice, Device } from "./device.dto";

/**
 * Device Repository based on dyanmodb
 */
export class DeviceRepo {

    private readonly generateID = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 22);
    
    constructor(private dynamoDB: AWS.DynamoDB.DocumentClient,
                private logger: Logger,
                private readonly table: string) {
    }

    /**
     * Find device for a user and an device id
     */
    public findDeviceByUserDeviceId({userId, userDeviceId}: { userDeviceId: string, userId: string }): Promise<Device | null> {
        this.logger.log(`Find User Deivce ${userDeviceId} for user ${userId}`);
        return null;
    }

    /**
     * Create a new device for a user
     */
    async create() {
        return null;
    }

    /**
     * Update the device for a user
     */
    async update() {
        return null;
    }

    /**
     * Delete the device for a user
     */
    async delete() {
        return null;
    }
}
