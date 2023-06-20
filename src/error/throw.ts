
export function throwGenericError(errMessage: string, traceLimit: number = 0, cause?: Error): void {
    Error.stackTraceLimit = traceLimit;
    const err: Error = cause != null ? new Error(errMessage, {cause}) : new Error(errMessage);

    throw err;
}

export function throwTypeError(): void {}

export function throwRangeError(): void {}