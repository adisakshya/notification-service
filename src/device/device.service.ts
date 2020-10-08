import { Injectable, Logger } from "@nestjs/common";
import { CreateEntityResponse } from "@common/dto";
import { AllDevicesResponse, RegisterDevice } from "./device.dto";
import { Device } from "@entity/device.entity";
import { customAlphabet } from "nanoid";
import { plainToClass } from "class-transformer";
import Boom = require("@hapi/boom");
import { FireBase } from "@common/firebase/firebase";

@Injectable()
export class DeviceService {
    private readonly generateID = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 22);
    constructor(private readonly logger: Logger,
                private readonly firebase: FireBase) {
    }

    public async createDevice(userId: string, device: RegisterDevice): Promise<CreateEntityResponse> {
        this.logger.log(`Registering device for user ${userId}`);
        const {fcmToken, name, type} = device;
        const verificationStatus = await this.firebase.verifyToken(fcmToken);
        if(!verificationStatus) {
            throw Boom.badData("Invalid FCM token", {reason: "INVALID_TOKEN"});
        }
        this.logger.log(`Valid FCM token found for user ${userId}`);
        this.logger.log(`Checking if device is already registered for user ${userId}`);
        const userDevice = await Device.findByFcmToken(userId, fcmToken);
        if(userDevice) {
            throw Boom.badData("Device already registered", {reason: "DEVICE_ALREADY_REGISTERED"});
        }
        this.logger.log(`Device not already registered for user ${userId}`);
        const createdDevice = await Device.create({
            fcmToken, userId, type, name,
            id: this.generateID(),
            createdAt: new Date().toISOString()
        }).save();
        this.logger.log(`Registered device for user ${userId}`);
        return plainToClass(CreateEntityResponse, {
            id: createdDevice.id
        });
    }

    public async deleteDevice(userId: string, id: string): Promise<void> {
        this.logger.log(`Deassociating deivce for user ${userId}`);
        const userDevice = await Device.findByDeviceId(userId, id);
        if(!userDevice) {
            throw Boom.badData("Device is not associated with the user", {reason: "DEVICE_NOT_ASSOCIATED"});
        }
        await userDevice.remove();
    }

    public async findAllDevices(userId: string): Promise<AllDevicesResponse> {
        this.logger.log(`Finding all deivces for user ${userId}`);
        const [userDevices, total] = await Device.findByUserId(userId);
        return plainToClass(AllDevicesResponse, {
            "devices": userDevices ||  []
        });
    }
}
