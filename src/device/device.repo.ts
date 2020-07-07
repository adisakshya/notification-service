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
        const timestamp = new Date().toISOString();
        const deviceId = this.generateID()
        const newUserDevice: Device = {
            deviceId: deviceId,
            fcmToken: fcmToken,
            createdAt: timestamp
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
            devices: userDevices || [newUserDevice],
            updatedAt: timestamp
        }
        // Create new entry for the user
        return this.dynamoDB.put({
            TableName: this.table,
            Item: {...devicesItem, ...dynamoItemKV}
        }).promise().then(() => deviceId);
    }

    /**
     * Update the list of associated devices for a user
     */
    async update(userId: string, updatedDeviceList: Device[]) {
        // Update list of user devices
        return this.dynamoDB.update({
            TableName: this.table,
            Key: {
                'userId': userId
            },
            UpdateExpression: "set devices = :devices, updatedAt = :updatedAt",
            ExpressionAttributeValues:{
                ":devices": updatedDeviceList,
                ":updatedAt": new Date().toISOString()
            },
            ReturnValues:"UPDATED_NEW"
        }).promise().then(() => true);
    }
}
