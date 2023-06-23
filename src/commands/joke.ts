import commander from 'commander';
import {raiseValueError, raiseTypeError, raiseValueRangeError} from '../error/commands';
import {throwGenericError} from '../error/throw';
import type {Command} from 'commander';

interface IJokeOptions {
    [index: string]: any;
}

const joke: Command = new commander.Command('joke');
const jokeCommand: Command = joke
    .description('Command for telling jokes.')
    .option('-c, --category [cat]', 'Select preferred category for the joke you are being told... (options: any, programming, misc, dark, pun, spooky, christmas)', 'any')
    .option('-l, --language [lang]', 'Select the language you would like the joke to be told in. (options: english, czech, french, german, portuguese, spanish)', 'english')
    .option('-a --amount [amnt]', 'Select the amount of jokes you would like to be told (limit: 10)', '1')
    .option('-t --type [valueType]', 'Select how many parts the joke should be. (options: single, two-part, both)', 'both')
    .option('-f --flag [fl...]', 'Select which types of jokes you would like to filter out (options: nsfw, religious, political, racist, sexist, explicit)')
    .option('-s --search [query]', 'Search for jokes that contains a search term.')
    .option('-i --id [jokeIds...]', 'Search for jokes by a range of id numbers. (or one if that floats your boat...)')
    .action((options: IJokeOptions): void => {
        const {category, language, amount, type, flag, id}: IJokeOptions = options;
        const validCatValues: Array<string> = ['any', 'programming', 'misc', 'dark', 'pun', 'spooky', 'christmas'];
        const validLangValues: Array<string> = ['english', 'czech', 'french', 'german', 'portuguese', 'spanish'];
        const validFlagValues: Array<string> = ['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit'];
        const validValueTypeValues: Array<string> = ['single', 'two-part', 'both'];
        const catType: string = typeof category;
        const langType: string = typeof language;
        const valueTypeValue: string = typeof type;

        if(catType !== 'string') raiseTypeError('category', catType, 'string');
        if(!validCatValues.includes(category)) raiseValueError('category', category, validCatValues);
        if(langType !== 'string') raiseTypeError('language', langType, 'string');
        if(!validLangValues.includes(language)) raiseValueError('language', language, validLangValues);
        if(Array.isArray(flag)) {
            let invalidFlagsTypes: Array<string> = [];
            const flagArray = flag as Array<string>;
            const areFlagValuesCorrectlyTyped: boolean = flagArray.every((item: any) => {
                const itemType: string = typeof item;
                const isItemString: boolean = itemType === 'string';

                if(!isItemString) invalidFlagsTypes = [...invalidFlagsTypes, itemType];

                return isItemString;
            });
            const areFlagValuesValid: boolean = flagArray.every((item: any) => validFlagValues.includes(item));

            if(!areFlagValuesCorrectlyTyped) raiseTypeError('flag', `Array<${invalidFlagsTypes.join(' | ')}>`, 'Array<string>');
            if(!areFlagValuesValid) raiseValueRangeError('flag', flag, validFlagValues);
        }
        if(Array.isArray(id)) {
            if(id.length > 2) throwGenericError('No more than two values for the field id are allowed...');

            let invalidIdTypes: Array<string> = [];
            const idArray = id as Array<string>;
            const areIdValuesCorrectlyTyped: boolean = idArray.every((item: any) => {
                try {
                    parseInt(item)
                    return true;
                } catch {
                    invalidIdTypes = [...invalidIdTypes, typeof item];
                    return false;
                }
            });

            if(!areIdValuesCorrectlyTyped) raiseTypeError('id', `Array<${invalidIdTypes.join(' | ')}>`, 'Array<number>');
        }
        if(valueTypeValue !== 'string') raiseTypeError('language', valueTypeValue, 'string');
        if(!validValueTypeValues.includes(type)) raiseValueError('type', type, validValueTypeValues);

        try {
            const amountNum: number = parseInt(amount);

            if(amountNum > 10) raiseValueError('amount', amountNum, ['less than or equal to 10']);

        } catch {
            raiseTypeError('amount', typeof amount, 'number');
        }

    });

export default jokeCommand;