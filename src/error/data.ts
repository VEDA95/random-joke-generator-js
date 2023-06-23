import {throwGenericError} from './throw';
import {writeErrorToJSON} from './save';

export function raiseCacheErr(err: any): void {
    const stringified_err: string = String(err);

    writeErrorToJSON(stringified_err, 'Generic');
    throwGenericError(stringified_err);
}

export function raiseRequestErr(err: any, code?: number): void {
    writeErrorToJSON(err?.message, 'Generic', null, code != null ? `request error - ${code}`: 'request error');
    throwGenericError(err?.message);
}