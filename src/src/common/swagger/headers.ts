import {ApiBody, ApiHeaders} from "@nestjs/swagger";

export const ApiCommonHeader = (): ClassDecorator => target => {
    // @ts-ignore
    ApiHeaders([
        {
            name: "X-Consumer-ID",
            description: 'Client ID who is making the request',
            required: true,
        },
        {
            name: "X-Authenticated-Userid",
            description: 'User id of the user on whom behalf client is making the request',
            required: true,
        }
    ])(target);
};
