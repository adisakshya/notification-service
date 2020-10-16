import {StringSplit} from "../transform/string-split";
import {ApiProperty} from "@nestjs/swagger";
import {ArrayMaxSize} from "class-validator";

export class ParamIds {
    @ApiProperty({
        type: String,
        description: "Comma separated list of ids",
        required: true
    })
    @ArrayMaxSize(20,)
    @StringSplit()
    ids: string[];
}
