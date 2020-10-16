import {Expose} from "class-transformer";
import {IsArray, IsOptional, IsString} from "class-validator";

export class ReadHeaders {
    @IsString()
    "x-consumer-id": string;

    @Expose()
    @IsString()
    "x-consumer-username": string;

    @Expose()
    @IsString()
    "x-authenticated-userid": string;

    public get userName() {
        return this["x-consumer-username"];
    }

    public get userId() {
        return this["x-authenticated-userid"];
    }

}

export class WriteHeaders extends ReadHeaders {

    @Expose()
    @IsString()
    "idempotency-key": string;

    @Expose()
    @IsOptional()
    @IsString()
    "temp-id": string;

    public get clientId() {
        return this["x-consumer-id"];
    }

    public get eventId() {
        return this["idempotency-key"];
    }

    public get tempId() {
        return this["temp-id"];
    }
}


