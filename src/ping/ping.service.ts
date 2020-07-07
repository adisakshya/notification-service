import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
    constructor() {}

    public async ping() {
        let res = {
            'ping': 'pong'
        };
        return res;
    }
}