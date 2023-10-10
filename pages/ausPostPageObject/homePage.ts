import basePageObject from "../basePageObjects";

class homePage extends basePageObject {
    postageCostLocator: string;
    redirectEmailLocator: string;
    homeLogo: string;
    homeLogoOnCalculatePostagePage: string;
    siteInteractionLists: string;
    trackingFormElement: string;
    validateRedirectEmailTitle: string;

    constructor(page: any) {
        super(page);
        this.postageCostLocator = ".sm__tools-item-name";
        this.redirectEmailLocator = ".sm__tools-item-name";
        this.homeLogo = 'a.header-site-title-link:first-child';
        this.homeLogoOnCalculatePostagePage = '.main-logo';
        this.siteInteractionLists = '.pn-link-title';
        this.trackingFormElement = '.js-tracking-form';
        this.validateRedirectEmailTitle = '[title="Redirect & hold mail"]';
    }

    async goto() {
        await this.navigateToUrl('https://auspost.com.au/');
    }

    async postageCostClick() {
        await this.waitForAndClickText(this.postageCostLocator, "Postage costs and delivery times");
    }

    async redirectEmailClick() {
        await this.waitForAndClickText(this.redirectEmailLocator, "Redirect or hold mail");
        await this.assertIsVisible(this.validateRedirectEmailTitle);
    }

    async homeLogoClick() {
        if (await this.isVisible(this.homeLogoOnCalculatePostagePage)) {
            await this.clickAndLog(this.homeLogoOnCalculatePostagePage);
        } else {
            await this.clickAndLog(this.homeLogo);
        }
    }

    async waitForPageLoad() {
        await this.waitForLoadState();
    }

    async siteInterationList(listText: string) {
        await this.waitForAndClickText(this.siteInteractionLists, listText);
    }

    async validateTrackingFormIsVisible() {
        await this.assertIsVisible(this.trackingFormElement);
    }
}

export default homePage;
