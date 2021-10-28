import {enUs} from './en-us/data';

export type LangKeyType = keyof typeof enUs;

export type LocaleDictionaryType = Record<LangKeyType, string>;
