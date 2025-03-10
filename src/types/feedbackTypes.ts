export type ValidationError<T extends any = any> = {
    message: string;
    condition?: (value: T) => boolean;
}