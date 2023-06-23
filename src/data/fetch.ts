import {raiseRequestErr} from '../error/data';

export interface IJokeResponse {
    error: boolean;
    category: 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Spooky' | 'Christmas';
    type: 'single' | 'twopart';
    setup: string;
    delivery: string;
    id: number;
    safe: boolean;
    lang: 'en' | 'cs' | 'de' | 'es' | 'fr' | 'pt';
    flags: {
        nsfw: boolean;
        religious: boolean;
        political: boolean;
        racist: boolean;
        sexist: boolean;
        explicit: boolean;
    };
};

export default async function fetchJokeData(ids: Array<number>, category?: string, flags?: Array<string>, type?: string, query?: string, amount?: number, language?: string): Promise<IJokeResponse> {
    let url: string = `https://v2.jokeapi.dev/joke/${category != null && category.length > 0 ? category : 'Any'}?`;
    let json_body: any;

    if(ids.length > 0) {
        url += ids.length > 1 ? `idRange=${ids[0] === ids[1] ? ids[0] : ids.join('-')}` : `idRange=${ids[0]}`;
    }
    if(flags != null && flags.length > 0) url += `&blacklistFlags=${flags.join(',')}`;
    if(type != null && type.length > 0) url += `&type=${type}`;
    if(query != null && query.length > 0) url += `&contains=${query}`;
    if(amount != null && amount > 0) url += `&amount=${amount}`;
    if(language != null && language.length > 0) url += `&lang=${language}`;
    

    try {
        const response: Response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok) raiseRequestErr(response, response.status);

        json_body = await response.json();

    } catch(err: any) {
        if(err != null) raiseRequestErr(err);
    }

    return json_body as IJokeResponse;
}