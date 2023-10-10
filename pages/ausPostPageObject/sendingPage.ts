import basePageObject from "../basePageObjects";

class sendingPage extends basePageObject {
    sendingPageHeaderElement: string;
    viewPackagingRangeElement: string;
    calculatePostageElement: string;
    trackingForm: string;
    packagingOptionElement: string;

    constructor(page: any) {
        super(page);
        this.sendingPageHeaderElement = "h1.spb__heading-h1";
        this.viewPackagingRangeElement = "View packaging range";
        this.calculatePostageElement = ".g-list__title";
        this.trackingForm = ".js-tracking-form";
        this.packagingOptionElement = "[title='Packaging options']";
    }

    async validateHeader() {
        await this.waitForTextContent(this.sendingPageHeaderElement, 'Sending');
    }

    async clickOnPackagingRange() {
        await this.getByTitleAndClick(this.viewPackagingRangeElement)
            .then(async () => {
                await this.assertIsVisible(this.packagingOptionElement);
            });
    }

    async clickOnCalculatePostageButton() {
        await this.waitForAndClickText(this.calculatePostageElement, 'Calculate postage & delivery times');
    }

    async validateTrackingFormIsVisible() {
        await this.assertIsVisible(this.trackingForm);
    }
}

export default sendingPage;
