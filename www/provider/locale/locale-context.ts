import {createLocalization, LocalizationConfigType, LocalizationStateType} from 'react-localization-library';

import {getSavedLocaleName, saveLocaleName} from './locale-context-helper';
import {LocaleNameEnum} from './locale-context-type';
import {LangKeyType} from './translation/type';
import {allLocalesData} from './locale-context-const';

const localizationConfig: LocalizationConfigType<LangKeyType, LocaleNameEnum> = {
    defaultLocaleName: getSavedLocaleName<LocaleNameEnum>(Object.values(LocaleNameEnum)),
    localization: allLocalesData,
    onUseEffect: (localizationProviderState: LocalizationStateType<LocaleNameEnum>) => {
        const {localeName} = localizationProviderState;

        saveLocaleName<LocaleNameEnum>(localeName);
    },
};

const {LocalizationProvider, Locale, useLocale} = createLocalization<LangKeyType, LocaleNameEnum>(localizationConfig);

export {LocalizationProvider, Locale, useLocale};
