import { test } from "@playwright/test";
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';


// Settings to control how tests are run.
// These could be set by environment variables or other input mechanisms.
// They are hard-coded here to keep the example project simple.
export const USE_ULTRAFAST_GRID: boolean = false;

// Applitools objects to share for all tests
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;



test.beforeAll(async () => {

    if (USE_ULTRAFAST_GRID) {
        // Create the runner for the Ultrafast Grid.
        // Concurrency refers to the number of visual checkpoints Applitools will perform in parallel.
        // Warning: If you have a free account, then concurrency will be limited to 1.
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    }
    else {
        // Create the classic runner.
        Runner = new ClassicRunner();
    }

    // Create a new batch for tests.
    // A batch is the collection of visual checkpoints for a test suite.
    // Batches are displayed in the Eyes Test Manager, so use meaningful names.
    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner';
    Batch = new BatchInfo({ name: `Playwright TypeScript with the ${runnerName}` });

    // Create a configuration for Applitools Eyes.
    Config = new Configuration();

    // Set the batch for the config.
    Config.setBatch(Batch);

    // If running tests on the Ultrafast Grid, configure browsers.
    if (USE_ULTRAFAST_GRID) {

        // Add 3 desktop browsers with different viewports for cross-browser testing in the Ultrafast Grid.
        // Other browsers are also available, like Edge and IE.
        Config.addBrowser(800, 600, BrowserType.CHROME);
        Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
        Config.addBrowser(1024, 768, BrowserType.SAFARI);

        // Add 2 mobile emulation devices with different orientations for cross-browser testing in the Ultrafast Grid.
        // Other mobile devices are available.
        Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
        Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    }
});

// In this example, there is only one test.
test.describe('ACME Bank', () => {

    // Test-specific objects
    let eyes: Eyes;

    // This method sets up each test with its own Applitools Eyes object.
    test.beforeEach(async ({ page }) => {
        eyes = new Eyes(Runner, Config);

        await eyes.open(page, 'Lambda test dummy portal', test.info().title, { width: 1200, height: 600 });
    });



    test("handling dropdown using applitool", async ({ page }) => {
        await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
        await eyes.check('Home Page', Target.window().fully());
        await page.selectOption("#select-demo", {
            // label: "Tuesday"
            // value: "Friday"
            index: 5
        })
        await page.waitForTimeout(3000);

        await page.selectOption("#multi-select", [
            {
                label: "Texas"
            }, {
                index: 2
            }, {
                value: "Washington"
            }
        ])
        await eyes.check('Main page', Target.window().fully().layout());
    })

    test("Bootstrap dropdown using applitool", async ({ page }) => {
        await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
        await selectCountry("India");
        await selectCountry("Denmark");
        await selectCountry("South Africa");
        await eyes.check('Country dropdown', Target.window().fully());
        // await page.waitForTimeout(3000)

        async function selectCountry(countryName) {
            await page.click("#country+span");
            await page.locator("ul#select2-country-results")
                .locator("li", {
                    hasText: countryName
                }).click();
        }
    })

  
    test.afterEach(async () => {
        await eyes.close();
    });
});


test.afterAll(async () => {

    // Close the batch and report visual differences to the console.
    // Note that it forces Playwright to wait synchronously for all visual checkpoints to complete.
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
});

