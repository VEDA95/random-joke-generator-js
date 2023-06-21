
export function throwGenericError(errMessage: string, traceLimit: number = 0, cause?: any): void {
    Error.stackTraceLimit = traceLimit;
    const err: Error = cause != null ? new Error(errMessage, {cause}) : new Error(errMessage);

    throw err;
}

export function throwTypeError(errMessage: string, traceLimit: number = 0, cause?: any): void {
    Error.stackTraceLimit = traceLimit;
    const err: Error = cause != null ? new TypeError(errMessage, {cause}) : new TypeError(errMessage);

    throw err;
}

export function throwRangeError(errMessage: string, traceLimit: number = 0, cause?: any): void {
    Error.stackTraceLimit = traceLimit;
    const err: Error = cause != null ? new RangeError(errMessage, {cause}) : new RangeError(errMessage);

    throw err;
}
