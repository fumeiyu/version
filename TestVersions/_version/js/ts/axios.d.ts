declare interface AxiosTransformer {
    (data: any): any;
}

declare interface AxiosAdapter {
    (config: AxiosRequestConfig): AxiosPromise;
}

declare interface AxiosBasicCredentials {
    username: string;
    password: string;
}

declare interface AxiosProxyConfig {
    host: string;
    port: number;
}

declare interface AxiosRequestConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: string;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: (status: number) => boolean;
    maxRedirects?: number;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig;
    cancelToken?: CancelToken;
}

declare interface AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
}

declare interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string;
    response?: AxiosResponse;
}

declare interface Promise<V> {
    then<R1, R2>(onFulfilled: (value: V) => R1 | Promise<R1>, onRejected: (error: any) => R2 | Promise<R2>): Promise<R1 | R2>;
    then<R>(onFulfilled: (value: V) => R | Promise<R>): Promise<R>;
    catch<R>(onRejected: (error: any) => R | Promise<R>): Promise<R>;
}

declare interface AxiosPromise extends Promise<AxiosResponse> {
}

declare interface CancelStatic {
    new (message?: string): Cancel;
}

declare interface Cancel {
    message: string;
}

declare interface Canceler {
    (message?: string): void;
}

declare interface CancelTokenStatic {
    new (executor: (cancel: Canceler) => void): CancelToken;
    source(): CancelTokenSource;
}

declare interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}

declare interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}

declare interface AxiosInterceptorManager<V> {
    use(onFulfilled: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
}

declare interface AxiosInstance {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    request(config: AxiosRequestConfig): AxiosPromise;
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}

declare interface AxiosStatic extends AxiosInstance {
    (config: AxiosRequestConfig): AxiosPromise;
    (url: string, config?: AxiosRequestConfig): AxiosPromise;
    create(config?: AxiosRequestConfig): AxiosInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    isCancel(value: any): boolean;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}

declare const axios: AxiosStatic;

declare let qs: any;
//declare  default  Axios;

declare module 'axios' {
    export = axios;
} 