import { devices, PlaywrightTestConfig } from '@playwright/test';

require('dotenv').config();


const config: PlaywrightTestConfig = {
    projects: [
        // {
        //     name: "chrome:latest:MacOS Catalina@lambdatest",
        //     use: {
        //         // viewport: { width: 1920, height: 1080 },
        //         ...devices["iPhone 14 Pro Max"]
        //     },
        // },
        // {
        //     name: "chrome:latest:Windows 10@lambdatest",
        //     use: {
        //         viewport: { width: 1280, height: 720 },
        //     },
        // },
        {
            name: "chrome",
            use: {
                ...devices["Desktop Chrome"]
            }
        },
        // {
        //     name: "firefox",
        //     use: {
        //         ...devices["iPhone 14 Pro Max"]
        //     }
        // }
    ],

    testMatch: ["tests/auspost/redirectEmail.spec.ts"],
    use: {
        // connectOptions: {
        //     wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=
        //     ${encodeURIComponent(JSON.stringify(capabilities))}`
        // },
        // baseURL: "https://ecommerce-playground.lambdatest.io/index.php?",
        baseURL: 'https://auspost.com.au/',
        headless: false,
        screenshot: "on",
        video: "on",
        launchOptions: {
            // slowMo: 1000
        },
    },
    timeout: 60 * 1000 * 5,
    retries: 0,
    reporter: [["dot"], ["json", {
        outputFile: "jsonReports/jsonReport.json"
    }], ["html", {
        open: "never"
    }]]
};

export default config;