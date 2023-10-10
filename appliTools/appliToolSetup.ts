import { Eyes, MatchLevel } from '@applitools/eyes-playwright';
import { Target } from '@applitools/eyes-playwright';

class AppliToolSetup {
    page: any;
    eyes: Eyes;

    constructor(page: any) {
        this.page = page;
        this.eyes = new Eyes();
    }

    async openEyes(appName: string, testName: string) {
        await this.eyes.open(this.page, appName, testName);
    }

    async eyesCheckFullWindow(pageName: string) {
        await this.eyes.check(pageName, Target.window().fully());
    }

    async eyesCheckRegionByElement(element: any) {
        await this.eyes.checkRegionByElement(element);
    }

    async eyesClose() {
        await this.eyes.close();
    }

    // async eyesCheckRegionBySelector(selector: string) {
    //     await this.eyes.check(Target.region(selector));
    // }

    // async eyesCheckFullFrame(frame: string) {
    //     await this.eyes.check(Target.frame(frame).fully());
    // }

    async eyesCheckIgnoreElement(text: string, ignoreRegions: any) {
        await this.eyes.check(text, Target.window().ignoreRegion(ignoreRegions));
    }

    async eyesSetMatchLevel(matchLevelType: string) {
        if (matchLevelType == 'Layout') {
            await this.eyes.setMatchLevel(MatchLevel.Layout);
        } else if (matchLevelType == 'Strict') {
            await this.eyes.setMatchLevel(MatchLevel.Strict);
        } else if (matchLevelType == 'Exact') {
            await this.eyes.setMatchLevel(MatchLevel.Exact);
        } else if (matchLevelType == 'IgnoreColors') {
            await this.eyes.setMatchLevel(MatchLevel.IgnoreColors);
        }
    }
}

export default AppliToolSetup;
