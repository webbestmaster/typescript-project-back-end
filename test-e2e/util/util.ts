import puppeteer, {
    Browser,
    BrowserConnectOptions,
    BrowserLaunchArgumentOptions,
    LaunchOptions,
    Page,
    Product,
} from 'puppeteer';

import {defaultPageGoToOption, pageFullUrl, user} from './const';

type AdditionalBrowserOptionsType = {
    extraPrefsFirefox?: Record<string, unknown>;
    product?: Product;
};

// eslint-disable-next-line max-len
type PuppeteerLaunchOptionsType = AdditionalBrowserOptionsType &
    BrowserConnectOptions &
    BrowserLaunchArgumentOptions &
    LaunchOptions;

const defaultBrowserOptions: PuppeteerLaunchOptionsType = {
    args: [
        // https://github.com/puppeteer/puppeteer/blob/main/docs/api.md - api
        // https://peter.sh/experiments/chromium-command-line-switches/ - all arguments for chrome

        // `--window-size=${width},${height}`,
        // `--window-position=${leftPosition},0`,
        // '--disable-infobars',
        // '--allow-insecure-localhost',
        // '--disable-gpu',
        // '--app=' + domain,
        // '--enable-automation',
        '--start-maximized',
        // '--disable-infobars',
        // '--hide-scrollbars',
        // `--window-size=${1200},${800}`,
    ],
    defaultViewport: null,
    headless: false,
    // slowMo: 100,
    // timeout: 10e3,
};

export function createBrowser(
    puppeteerLaunchOptions: Partial<PuppeteerLaunchOptionsType> = defaultBrowserOptions
): Promise<Browser> {
    const fullBrowserOptions: PuppeteerLaunchOptionsType = {
        ...defaultBrowserOptions,
        ...puppeteerLaunchOptions,
    };

    return puppeteer.launch(fullBrowserOptions);
}

export async function makeLogin(page: Page | null): Promise<void> {
    if (!page) {
        throw new Error('[makeLogin]: ERROR: page in not define');
    }
    await page.goto(pageFullUrl.login, defaultPageGoToOption);

    await page.focus('input[type=email]');
    await page.keyboard.type(user.login);
    await page.focus('input[type=password]');
    await page.keyboard.type(user.password);
    await page.click('button[type=submit]');

    // after success login should navigate to company
    await page.waitForNavigation({timeout: 5e3});

    // footer exists only on logged required pages
    await page.waitForSelector('footer');
}
