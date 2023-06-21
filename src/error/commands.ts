import {throwGenericError, throwTypeError, throwRangeError} from './throw';
import {writeErrorToJSON} from './save';

export function raiseValueError(field: string, providedValue: any, correctValues?: Array<any>, err?: any): void {
    let errMessage: string = correctValues != null && correctValues.length > 0 ?
        `The value for ${field} is invalid. Value provided was: ${providedValue}. Valid values include: ${correctValues?.join(', ')}` :
        `The value for ${field} is invalid. Value provided was: ${providedValue}.`;

    if(err != null) {
        writeErrorToJSON(errMessage, 'Generic', field, err);
        throwGenericError(errMessage, 10, err);

    } else {
        writeErrorToJSON(errMessage, 'Generic', field);
        throwGenericError(errMessage);
    }
}

export function raiseValueRangeError(field: string, providedRange: Array<any>, correctRange?: Array<any>, err?: any): void {
    let errMessage: string = correctRange != null && correctRange.length > 0 ?
        `The values for ${field} are invalid. Values provided were: ${providedRange.join(', ')}. Valid values include: ${correctRange?.join(', ')}` :
        `The value for ${field} is invalid. Value provided was: ${providedRange.join(', ')}.`;

    if(err != null) {
        writeErrorToJSON(errMessage, 'Range', field, err);
        throwRangeError(errMessage, 10, err);

    } else {
        writeErrorToJSON(errMessage, 'Range', field);
        throwRangeError(errMessage);
    }
}

export function raiseTypeError(field: string, valueType: string, correctType?: string, err?: any): void {
    let errMessage: string = correctType != null && correctType.length > 0 ?
        `The data type of the value for ${field} is invalid. The data type of the value provided is: ${valueType}. The valid data type for ${field} is ${correctType}` :
        `The data type of the value for ${field} is invalid. The data type of the value provided is: ${valueType}.`;

    if(err != null) {
        writeErrorToJSON(errMessage, 'Type', field, err);
        throwTypeError(errMessage, 10, err);

    } else {
        writeErrorToJSON(errMessage, 'Type', field);
        throwTypeError(errMessage);
    }
}