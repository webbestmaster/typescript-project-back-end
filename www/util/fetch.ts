/* global fetch, Headers, FormData, Response, File */

import {JSONSchemaType} from 'ajv';

import {getExpectedStructure} from './object';

export enum FetchMethodEnum {
    delete = 'DELETE',
    get = 'GET',
    patch = 'PATCH',
    post = 'POST',
    put = 'PUT',
}

type OptionsType = {
    body?: File | FormData | string; // body data type must match "Content-Type" header
    credentials?: 'include' | 'omit' | 'same-origin'; // include, same-origin, omit (default: same-origin)
    headers?: Array<Array<string>> | Headers | Record<string, string>;
    method?: FetchMethodEnum; // GET, POST, PUT, DELETE, etc. (default: GET)
    mode?: 'cors' | 'no-cors' | 'same-origin'; // no-cors, cors, same-origin (default: same-origin)
    // cache?: 'default'; // default, no-cache, reload, force-cache, only-if-cached (default: default)
    // headers?: {
    //     'Access-Control-Allow-Headers'?: '*',
    //     Accept?: 'application/json, text/javascript, */*; q=0.01',
    //     'Content-Type'?: 'application/x-www-form-urlencoded; charset=UTF-8',
    // },
    // redirect?: 'follow'; // manual, follow, error (default: follow)
    // referrer?: 'no-referrer'; // no-referrer, client (default: client)
};

type FetchCacheType = Record<string, unknown>;

const fetchCache: FetchCacheType = {};

function invalidateCache(options?: OptionsType) {
    const {method} = options || {};

    if (!method || method === FetchMethodEnum.get) {
        return;
    }

    Object.keys(fetchCache).forEach((key: string) => {
        fetchCache[key] = null;
    });
}

function fetchEndCallBack(fetchBeginTimeStamp: number, url: string) {
    const maxFetchingTime = 2e3; // 2 seconds
    const fetchEndTimeStamp = Date.now();
    const fetchingTime = fetchEndTimeStamp - fetchBeginTimeStamp;

    if (fetchingTime > maxFetchingTime) {
        console.log(`%c[WARNING]: "${url}" took %c${fetchingTime / 1e3}s`, 'color: #00c', 'color: #c00');
    }
}

export async function fetchX<ExpectedResponseType>(
    url: string,
    jsonSchema: JSONSchemaType<ExpectedResponseType>,
    options?: OptionsType
): Promise<ExpectedResponseType> {
    invalidateCache(options);

    const cacheProperty = `${url} - ${JSON.stringify(options || '[empty]')}`;

    const savedPromiseResult = fetchCache[cacheProperty];

    if (savedPromiseResult) {
        // console.log(`[fetchX]: [CACHE]\n> url: ${url},\n> options: ${JSON.stringify(options || '[empty]')}`);
        // return savedPromiseResult as Promise<ExpectedResponseType>;
        return getExpectedStructure<ExpectedResponseType>(savedPromiseResult, jsonSchema);
    }

    const fetchBeginTimeStamp = Date.now();

    try {
        const response: Response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const fetchResult: ExpectedResponseType = getExpectedStructure<ExpectedResponseType>(
            await response.json(),
            jsonSchema
        );

        fetchCache[cacheProperty] = fetchResult;

        return fetchResult;
    } catch (error: unknown) {
        fetchCache[cacheProperty] = null;
        console.error(error);
        throw error;
    } finally {
        fetchEndCallBack(fetchBeginTimeStamp, url);
    }
}
