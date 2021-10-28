/* global setTimeout */

import {lazy, Suspense, useEffect, useState} from 'react';
import {useSystem} from 'react-system-hook';
import {NavigationLink} from 'react-router-dom-hook';
import markdownPro, {MarkdownConfigShallowType} from 'markdown-pro';
import 'markdown-pro/dist/style.css';
import {JSONSchemaType} from 'ajv';

import {Locale, useLocale} from '../../provider/locale/locale-context';
import {Spinner} from '../../layout/spinner/spinner';
import {ErrorData} from '../../layout/error-data/error-data';
import {appRoute} from '../../component/app/app-route';
import {LocaleNameEnum} from '../../provider/locale/locale-context-type';
import {useFormat} from '../../hook/format-hook/format-hook';
import {getTestNodeData, getTestNodeId} from '../../util/auto-test';
import {Library} from '../../library/library';
import {AsciiSpinner} from '../../layout/spinner/c-ascii-spinner';
import {ExampleAudio} from '../../component/example-audio/c-example-audio';
import {ExamplePlayer} from '../../component/example-audio-player/c-example-audio-player';
import {fetchX} from '../../util/fetch';

import pngImageSrc from './image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from './image/questions-with-an-official-answer.svg';
import homeStyle from './home.scss';

console.log(ErrorData);

type MyIpType = {
    ip: string;
};

const myIpSchema: JSONSchemaType<MyIpType> = {
    additionalProperties: false,
    properties: {
        // eslint-disable-next-line id-length
        ip: {type: 'string'},
    },
    required: ['ip'],
    type: 'object',
};

const LoadMeAsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'load-me-async-lazy' */
            '../../component/load-me-async-lazy/load-me-async-lazy'
        )
);

const htmlCode = markdownPro('# Markdown Pro'); // <h1>Markdown Pro</h1>

const config: MarkdownConfigShallowType = {
    parseLink: true,
    useLineBreak: true,
    useWrapper: true,
    wrapperClassName: 'my-markdown-pro',
};

const htmlCodeConfigured = markdownPro('# Markdown Pro', config);

console.log(htmlCode, htmlCodeConfigured);

export function Home(): JSX.Element {
    const {getLocalizedString, setLocaleName, localeName} = useLocale();
    const {getFormattedNumber} = useFormat();
    const {screenInfo} = useSystem();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [myIp, setMyIp] = useState<MyIpType | null>(null);

    setTimeout(() => {
        console.log(isOpen);
        setIsOpen(false);
    }, 1e3);

    useEffect(() => {
        (async () => {
            const myPpData: MyIpType = await fetchX<MyIpType>('https://api.ipify.org?format=json', myIpSchema);

            setMyIp(myPpData);
        })();
    }, []);

    useEffect(() => {
        console.log('home');
    });

    console.log('evaluate home');

    return (
        <div>
            <h1 className={homeStyle.home_header}>
                home page (<AsciiSpinner />)
            </h1>

            <h4>your ip is: {myIp ? myIp.ip : <AsciiSpinner />}</h4>

            <hr />

            <button
                data-test-data={getTestNodeData({data: 'some-string'})}
                data-test-id={getTestNodeId('language-button')}
                onClick={() =>
                    setLocaleName(localeName === LocaleNameEnum.enUs ? LocaleNameEnum.ruRu : LocaleNameEnum.enUs)}
                type="button"
            >
                {localeName}
            </button>

            <hr />

            <NavigationLink to={appRoute.info.path}>to info</NavigationLink>

            <hr />

            <code>{getFormattedNumber(321, {style: 'unit', unit: 'liter', unitDisplay: 'long'})}</code>

            <pre>{JSON.stringify(screenInfo, null, 4)}</pre>

            <Locale stringKey="BUTTON__APPLY" />

            <h4>{getLocalizedString('BUTTON__APPLY')}</h4>

            <img alt="" src={pngImageSrc} />

            <img alt="" src={svgImageSrc} />

            <SvgAsReactComponent />

            <Suspense fallback={<Spinner position="absolute" />}>
                <LoadMeAsyncLazy smth="home" />
            </Suspense>

            <Library textContent="Hello, World">
                <p>inner text</p>
            </Library>

            <hr />

            <ExampleAudio />

            <ExamplePlayer />
        </div>
    );
}
