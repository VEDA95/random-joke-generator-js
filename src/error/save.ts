import { writeFileSync } from 'fs';
import { resolve } from 'path';

export interface IJSONErrorLog {
	type: string;
	date: Date;
	message: string;
	field?: string;
	cause?: any;
}

export function writeErrorToJSON(errMessage: string, errType: string, field?: string, cause?: any): void {
	const now: Date = new Date();
	let errBody: IJSONErrorLog = {
		type: errType,
		date: now,
		message: errMessage
	};

	if (field != null && field.length > 0) errBody = { ...errBody, field };
	if (cause != null) errBody = { ...errBody, cause };

	writeFileSync(
		resolve(
			`./errors/random_joke_generator_error_${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}.json`
		),
		JSON.stringify(errBody)
	);
}
