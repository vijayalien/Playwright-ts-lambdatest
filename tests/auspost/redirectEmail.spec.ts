import { test } from "@playwright/test";
import automation from '../../pages/automation';
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

export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;



test.beforeAll(async () => {

    if (USE_ULTRAFAST_GRID) {
        Runner = new VisualGridRunner({ testConcurrency: 5 });
    }
    else {
        Runner = new ClassicRunner();
    }

    // Create a new batch for tests.
    // A batch is the collection of visual checkpoints for a test suite.
    // Batches are displayed in the Eyes Test Manager, so use meaningful names.
    const runnerName = (USE_ULTRAFAST_GRID) ? 'Ultrafast Grid' : 'Classic runner';
    Batch = new BatchInfo({ name: `Playwright TypeScript with the ${runnerName}` });

    Config = new Configuration();

    Config.setBatch(Batch);

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
test.describe('Auspost test', () => {

    // Test-specific objects
    let eyes: Eyes;

    // This method sets up each test with its own Applitools Eyes object.
    test.beforeEach(async ({ page }) => {
        eyes = new Eyes(Runner, Config);

        await eyes.open(page, 'Auspost Test', test.info().title, { width: 1200, height: 600 });
    });

    test('01 postage Cost module', async ({ page }) => {
        // const applitoolSetup = new appliToolSetup(page);
        const automation_PO = new automation(page);

        await page.goto('/');
        await automation_PO.homePage.postageCostClick();
        await eyes.check('Postage cost page', Target.window().fully());
        await automation_PO.calculatePostage.validateHeader();
        await automation_PO.calculatePostage.enterPostCode('3000', '3128');
        await automation_PO.calculatePostage.validatePageDescriptionHeader('Delivering from MELBOURNE');
        await eyes.check('Delivery location page', Target.window().fully());
    });

    test('02 Redirect email', async ({ page }) => {
        const automation_PO = new automation(page);

        await page.goto('/');
        await eyes.check('Home Page New', Target.window().fully());
        await automation_PO.homePage.redirectEmailClick();

        await automation_PO.redirectMail.validateRedirectOrHoldEmailHeader();
        await eyes.check('Redirect or Hold Email', Target.window().fully());
        await automation_PO.redirectMail.clickOnRedirectMail();
        await eyes.check('Redirect Email', Target.window().fully());
    });

    test('03 Test 3', async ({ page }) => {
        const automation_PO = new automation(page);
        await page.goto('/');
        await automation_PO.homePage.waitForPageLoad();
        await eyes.check('Home Page', Target.window().fully());
        await automation_PO.homePage.redirectEmailClick();
        await automation_PO.redirectMail.validateRedirectOrHoldEmailHeader();
        await eyes.check('Redirect or Hold Email', Target.window().fully());
        await automation_PO.redirectMail.clickOnRedirectMail();
        await eyes.check('Redirect Email', Target.window().fully());
        await automation_PO.homePage.homeLogoClick();
        await automation_PO.homePage.postageCostClick();
        await eyes.check('Postage cost page', Target.window().fully());
        await automation_PO.calculatePostage.validateHeader();
        await automation_PO.calculatePostage.enterPostCode('3000', '3128');
        await automation_PO.calculatePostage.validatePageDescriptionHeader('Delivering from MELBOURNE');
        await eyes.check('Delivery location page', Target.window().fully());
    });

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

