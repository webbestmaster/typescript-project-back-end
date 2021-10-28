/* global setTimeout */

import {lazy, Suspense, useEffect, useState} from 'react';
import {useSystem, useScreenHeight, useScreenWidth, useScreenSize} from 'react-system-hook';
import {NavigationLink} from 'react-router-dom-hook';

import {Locale, useLocale} from '../../provider/locale/locale-context';
import {Spinner} from '../../layout/spinner/spinner';
import {ErrorData} from '../../layout/error-data/error-data';
import {appRoute} from '../../component/app/app-route';
import pngImageSrc from '../home/image/marker-icon-2x.png';
import svgImageSrc, {ReactComponent as SvgAsReactComponent} from '../home/image/questions-with-an-official-answer.svg';
import homeStyle from '../home/home.scss';

console.log(ErrorData);

const LoadMeAsyncLazy = lazy(
    () =>
        import(
            /* webpackChunkName: 'load-me-async-lazy' */
            '../../component/load-me-async-lazy/load-me-async-lazy'
        )
);

export function Info(): JSX.Element {
    const {getLocalizedString} = useLocale();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        screenInfo,
        // isBrowser, // true if running in browser, false for SSR
    } = useSystem();

    /*
    const {
        devicePixelRatio, // number, default: 2, usually is 2 for smartphones
        isLandscape, // true if width > height
        isMobile, // screen width < 768
        isPortrait, // opposite for isLandscape
        name, // ScreenWidthNameEnum, relative from screen width: 'desktop', 'mobile' or 'tablet'
        isTablet, // screen width < 980 and >= 768
        isDesktop, // screen width >= 980
    } = screenInfo;
*/

    const {
        height, // number, default: 768
        width, // number, default: 980
    } = useScreenSize();

    const screenWidth = useScreenWidth(); // number, default: 980
    const screenHeight = useScreenHeight(); // number, default: 768

    useEffect(() => {
        console.log('info');
    });

    setTimeout(() => {
        console.log(isOpen);
        setIsOpen(false);
    }, 1e3);

    console.log('evaluate info');

    return (
        <div>
            <h1 className={homeStyle.home_header}>info page</h1>

            <NavigationLink to={appRoute.root.path}>to home</NavigationLink>

            <pre>{JSON.stringify(screenInfo, null, 4)}</pre>
            <pre>{JSON.stringify({height, screenHeight, screenWidth, width}, null, 4)}</pre>

            <Locale stringKey="BUTTON__APPLY" />

            <h4>{getLocalizedString('BUTTON__APPLY')}</h4>

            <img alt="" src={pngImageSrc} />

            <img alt="" src={svgImageSrc} />

            <SvgAsReactComponent />

            <Suspense fallback={<Spinner position="absolute" />}>
                <LoadMeAsyncLazy smth="info" />
            </Suspense>
        </div>
    );
}
