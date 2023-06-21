import commander from 'commander';
import {raiseValueError, raiseTypeError, raiseValueRangeError} from '../error/commands';
import type {Command} from 'commander';

const joke: Command = new commander.Command('joke');
const jokeCommand: Command = joke
    .description('Command for telling jokes.')
    .option('-c, --category [cat]', 'Select preferred category for the joke you are being told... (options: any, programming, misc, dark, pun, spooky, christmas)', 'any')
    .option('-l, --language [lang]', 'Select the language you would like the joke to be told in. (options: english, czech, french, german, portuguese, spanish)', 'english')
    .option('-f --flag [fl...]', 'Select which types of jokes you would like to filter out (options: nsfw, religious, political, racist, sexist, explicit)')
    .option('-t --type [valueType]', 'Select how many parts the joke should be. (options: single, two-part, both)', 'both')
    .option('-s --search [query]', 'Search for jokes that contains a search term.')
    .option('-i --id [jokeIds...]', 'Search for jokes by a range of id numbers. (or one if that floats your boat...)')
    .option('-a --amount [amnt]', 'Select the amount of jokes you would like to be told (limit: 120)', '1')
    .action((cat, lang, fl, valueType, query, ids, amnt): void => {
        const validCatValues: Array<string> = ['any', 'programming', 'misc', 'dark', 'pun', 'spooky', 'christmas'];
        const validLangValues: Array<string> = ['english', 'czech', 'french', 'german', 'portuguese', 'spanish'];
        const validFlagValues: Array<string> = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];
        const validValueTypeValues: Array<string> = ['single', 'two-part', 'both'];
        const catType: string = typeof cat;
        const langType: string = typeof lang;
        const valType: string = typeof valueType;
        const queryType: string = typeof query;


        if(catType !== 'string') raiseTypeError('category', catType, 'string');
        if(!validCatValues.includes(cat)) raiseValueError('category', cat, validCatValues);
        if(langType !== 'string') raiseTypeError('language', langType, 'string');
        if(!validCatValues.includes(cat)) raiseValueError('language', lang, validLangValues);
        if(fl != null || fl.length > 0) {
            const flagArray = fl as Array<any>;
            let invalidValues: Array<string> = [];
            const areFlagValuesValid: boolean = flagArray.every((item: any) => validFlagValues.includes(item));
            const areFlagValuesCorrectlyTyped: boolean = flagArray.every((item: any) => {
                const itemType: string = typeof item;
                const isString: boolean = itemType === 'string';

                if(!isString) invalidValues = [...invalidValues, itemType];

                return isString;
            });

            if(!areFlagValuesCorrectlyTyped) raiseTypeError('flags', invalidValues.join(' | '), 'Array<string>');
            if(!areFlagValuesValid) raiseValueRangeError('flags', fl, validFlagValues);
        }
        if(valType !== 'string') raiseTypeError('type', valType, 'string');
        if(!validValueTypeValues.includes(valueType)) raiseValueError('type', valueType, validValueTypeValues);
        if(query != null && queryType !== 'string') raiseTypeError('search', queryType, 'string');
        if(ids != null || ids.length > 0) {
            let invalidIdTypes: Array<string> = [];
            const idsArray = ids as Array<string>;
            const areIdsCorrectlyTyped: boolean = idsArray.every((item: any) => {
                try {
                    parseInt(item);
                    return true;
                } catch {
                    invalidIdTypes = [...invalidIdTypes, typeof item];
                    return false;
                }
            });

            if(!areIdsCorrectlyTyped) raiseTypeError('ids', invalidIdTypes.join(' | '), 'Array<number>');
        }
        if(amnt != null) {
            try {
                parseInt(amnt);

            } catch {
                raiseTypeError('amount', typeof amnt, 'number');
            }
        }

    });

export default jokeCommand;