export interface CommonResponse<T = void> {
    statusCode: number;
    error?: string;
    message?: string | typeof Array;
    data?: T;
    token?: string;
    publicKey?: string;
}
