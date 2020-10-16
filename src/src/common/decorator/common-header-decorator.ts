import {ReadHeaders, WriteHeaders} from "../dto/base-header.dto";
import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {Request} from "express";

export const WriteHeader = createParamDecorator((data: unknown, ctx: ExecutionContext,) => {
    return plainToClass(WriteHeaders, ctx.switchToHttp().getRequest<Request>().headers, {excludeExtraneousValues: true});
});

export const ReadHeader = createParamDecorator((data: unknown, ctx: ExecutionContext,) => {
    return plainToClass(ReadHeaders, ctx.switchToHttp().getRequest<Request>().headers, {excludeExtraneousValues: true});
});
