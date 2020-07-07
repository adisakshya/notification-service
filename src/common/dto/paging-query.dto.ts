import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsNumber} from "class-validator";

export class PagingQuery {
    @ApiProperty({
        description: "Number of resources to be loaded in a single request",
        required: false,
        default: 20,
        minimum: 1
    })
    @IsNumber()
    @Type(() => Number)
    limit: number = 20;

    @ApiProperty({
        description: "Starting point from which resource is to be loaded",
        required: false,
        default: 0,
    })
    @IsNumber()
    @Type(() => Number)
    offset: number = 0;

}