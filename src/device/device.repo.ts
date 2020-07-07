import { Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { UserDevice, Device } from "./device.dto";
import { customAlphabet } from "nanoid";
import { DataExchange } from "aws-sdk";

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
     * Find all device for a user
     */
    public findDeviceByUserId(userId: string): Promise<Device[]> {
        // Get all devices for a user
        return this.dynamoDB.get({
            TableName: this.table,
            Key: {
                'userId': userId
            }
        }).promise().then((data) => data?.Item?.devices);
    }

    /**
     * Create a new device for a user
     */
    async create(userId: string, fcmToken: string, userDevices: Device[]) {
        // Create device object with new device included
        const deviceId = this.generateID()
        const newUserDevice: Device = {
            deviceId: deviceId,
            fcmToken: fcmToken,
            createdAt: new Date().toISOString()
        };
        
        // If user already has some devices registered then
        // Add the new device to the list of registered devices for the user
        // Else we will add the new device only
        if(userDevices) {
            userDevices.push(newUserDevice);
        }

        // Generate timestamp for device registration time
        const dynamoItemKV = {
            userId: userId
        };
        // Item object
        const devicesItem = {
            devices: userDevices || [newUserDevice]
        }
        // Create new entry for the user
        return this.dynamoDB.put({
            TableName: this.table,
            Item: {...devicesItem, ...dynamoItemKV}
        }).promise().then(() => deviceId);
    }

    /**
     * Update the device for a user
     */
    async update(params: UserDevice) {
        // Generate timestamp for device registration time
        // const timestamp = Date.now();
        // const dynamoItemKV = {
        //     userId: `USER|${params.userId}`
        // };
        // // Create item object
        // const device = {
        //     userId: `USER|${params.userId}`,
        //     deviceIds: params.devices,
        //     updatedAt: timestamp
        // };
        // this.logger.debug(device);
        // // Update list of user devices
        // return this.dynamoDB.update({
        //     TableName: this.table,
        //     Key: {
        //         'userId': params.userId
        //     },
        //     UpdateExpression: "set deviceIds = :devices",
        //     ExpressionAttributeValues:{
        //         ":devices": params.devices
        //     },
        //     ReturnValues:"UPDATED_NEW"
        // }).promise().then(() => device);
        return null;
    }

    /**
     * Delete the device for a user
     */
    async delete() {
        return null;
    }
}
