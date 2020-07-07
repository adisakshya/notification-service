import {ArgumentsHost, BadRequestException, Catch, ExceptionFilter} from "@nestjs/common";
import {Response} from "express";
import Boom = require("@hapi/boom");

@Catch()
export class BoomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.error(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let error;
        if (Boom.isBoom(exception)) {
            error = {
                message: exception.message,
                reason: exception.data.reason ?? "UNKNOWN_ERROR",
                status: exception.output.statusCode
            };
            return response.status(error.status).json({error});
        }
        if (exception instanceof BadRequestException) {
            error = {
                message: "Invalid request",
                reason: "INVALID_REQUEST",
                status: exception.getStatus()
            };
        } else {
            error = {
                message: "Unknown error",
                reason: "UNKNOWN_ERROR",
                status: 500
            };
        }

        response.status(error.status).json({error});
    }
}
