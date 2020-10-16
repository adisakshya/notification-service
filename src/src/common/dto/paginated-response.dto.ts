interface PagingResponseParams {
    href: string;
    offset: number;
    limit: number;
    next: string;
    total: number;
}

export class PagingResponse {
    constructor(key: "devices", value: any[], params: PagingResponseParams) {
        this[key] = {
            href: params.href,
            items: value,
            limit: params.limit,
            offset: params.offset,
            next: params.next,
            total: params.total,
        };
    }
}
