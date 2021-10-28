import {enUs} from './translation/en-us/data';
import {ruRu} from './translation/ru-ru/data';
import {zhCn} from './translation/zh-cn/data';
import {zhTw} from './translation/zh-tw/data';
import {LocaleDictionaryType} from './translation/type';
import {LocaleConstType, LocaleNameEnum} from './locale-context-type';

export const allLocalesData: Record<LocaleNameEnum, LocaleDictionaryType> = {
    [LocaleNameEnum.enUs]: enUs,
    [LocaleNameEnum.ruRu]: ruRu,
    [LocaleNameEnum.zhCn]: zhCn,
    [LocaleNameEnum.zhTw]: zhTw,
};

export const localeConst: LocaleConstType = {
    defaults: {
        localeName: LocaleNameEnum.enUs,
    },
    key: {
        localStorage: {
            localeName: 'my-locale-name-v.1.0', // PROJECT_ID + 'my-locale-name-v.1.0'
        },
    },
};
