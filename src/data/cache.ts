import {existsSync, writeFileSync, readFileSync} from 'fs';
import {resolve} from 'path';
import {raiseCacheErr} from '../error/data';
import type {IJokeResponse} from './fetch';

export interface ICacheConfig {
    enabled: boolean;
    maxAge: number;
}

export interface ICachedJoke extends IJokeResponse {
    date_fetched: Date;
}

export interface IJokeCache {
    [index: number]: ICachedJoke;
}

export interface ICache {
    last_updated: Date;
    next_clear: Date | null;
    jokes: IJokeCache;
}


export function initCacheConfig(defaultState: boolean = true, maxAge: number | null = 86400): ICacheConfig {
    const cache_path: string = resolve('./cache_config.json');

    if(existsSync(cache_path)) {
        const config_file: string = readFileSync(cache_path).toString();

        return JSON.parse(config_file) as ICacheConfig;
    }

    const default_config: ICacheConfig = {enabled: defaultState, maxAge: maxAge as number};

    try {
        writeFileSync(cache_path, JSON.stringify(default_config));
    } catch(err: any) {
        if(err != null) raiseCacheErr(err);
    }

    return default_config;
}

export function createJokeCache(jokes?: Array<ICachedJoke>): IJokeCache  {
    if(!Array.isArray(jokes) || jokes.length === 0) return {};

    let output: IJokeCache = {};
    const now: Date = new Date();

    for(let joke of jokes) {
        output = {...output, [joke.id]: joke};
    }

    return output;
}

export function initCache(maxAge: number | null, jokes?: Array<ICachedJoke>): ICache {
    const cache_path: string = resolve('./cache.json');
    const now: Date = new Date();
    const cache: ICache = {
        last_updated: now,
        next_clear: maxAge !== null ? new Date(now.setSeconds(now.getSeconds() + maxAge)) : maxAge,
        jokes: jokes != null ? createJokeCache(jokes) : createJokeCache()
    };

    writeFileSync(cache_path, JSON.stringify(cache));
    return cache;
}

export function setCache(jokes: Array<IJokeResponse>, maxAge: number | null): ICache {
    const cache_path: string = resolve('./cache.json');
    const now: Date = new Date();
    const cached_jokes: Array<ICachedJoke> = jokes.map((joke: IJokeResponse) => ({...joke, date_fetched: now}));
    let cache: ICache;

    if(!existsSync(cache_path)) {
        cache = initCache(maxAge, cached_jokes);

    } else {
        let json_cache: any;

        try {
            json_cache = JSON.parse(readFileSync(cache_path).toString());
            
        } catch(err: any) {
            if(err != null) raiseCacheErr(err);
        }

        cache = {...json_cache as ICache, jokes: createJokeCache(cached_jokes)};
    }

    writeFileSync(cache_path, JSON.stringify(cache));

    return cache;
}

export function fetchCache(maxAge: number | null,): ICache {
    const cache_path: string = resolve('./cache.json');
    const now: Date = new Date();
    
    if(!existsSync(cache_path)) return initCache(maxAge);

    let readCache: ICache | undefined;

    try {
        readCache = JSON.parse(readFileSync(cache_path).toString());

    } catch(err: any) {
        if(err != null) raiseCacheErr(err);
    }

    if(readCache?.next_clear != null && now > readCache?.next_clear) {
        setCache([], maxAge);

        readCache = {...readCache, jokes: {}};
    }

    return readCache as ICache;
}
