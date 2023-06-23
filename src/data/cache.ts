import {existsSync, writeFileSync, readFileSync} from 'fs';
import {resolve} from 'path';
import type {IJokeResponse} from './fetch';

export interface ICacheConfig {
    enabled: boolean;
    maxAge: number;
}

export interface ICachedJoke extends IJokeResponse {
    date_fetched: Date;
}

export interface ICache {
    last_updated: Date;
    next_clear: Date | null;
    jokes: {
        [index: number]: ICachedJoke;
    };
}

export function initCacheConfig(defaultState: boolean = true, maxAge: number | null = 86400): ICacheConfig {
    const cache_path: string = resolve('./cache_config.json');

    if(existsSync(cache_path)) {
        const config_file: string = readFileSync(cache_path).toString();

        return JSON.parse(config_file) as ICacheConfig;
    }

    const default_config: ICacheConfig = {enabled: defaultState, maxAge: maxAge as number};

    writeFileSync(cache_path, JSON.stringify(default_config));

    return default_config;
}

export function setCache(jokes: Array<IJokeResponse>, maxAge: number | null): ICache {}

export function fetchCache(maxAge: number | null,): ICache {
    const cache_path: string = resolve('./cache.json');
    const now: Date = new Date();
    
    if(!existsSync(cache_path)) {
        const cache: ICache = {
            last_updated: now,
            next_clear: maxAge !== null ? new Date(now.setSeconds(now.getSeconds() + maxAge)) : maxAge,
            jokes: {}
        };

        writeFileSync(cache_path, JSON.stringify(cache));
        return cache;
    }

    let readCache: ICache | undefined;

    try {
        readCache = JSON.parse(readFileSync(cache_path).toString());

    } catch(err: any) {
        if(err != null) throw err;
    }

    if(readCache?.next_clear != null && now > readCache?.next_clear) {
        setCache([], maxAge);

        readCache = {...readCache, jokes: {}};
    }

    return readCache as ICache;
}
