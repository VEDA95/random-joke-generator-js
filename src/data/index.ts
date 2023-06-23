import fetchJokeData from './fetch';
import { getRandomId } from './random';
import {fetchCache, setCache} from './cache';
import type {ICachedJoke, ICache} from './cache';

export function getJoke(maxAge: number | null, ids?: Array<number>, category?: string, flags?: Array<string>, type?: string, query?: string, amount?: number, language?: string): ICachedJoke {
    const cache: ICache = fetchCache(maxAge);
}