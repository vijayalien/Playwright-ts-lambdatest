import basePageObject from "../basePageObjects";

class calculatePostage extends basePageObject {
    calculatePostageHeader: string;
    fromPostCode: string;
    toPostCode: string;
    submitButton: string;
    postagePageDescription: string;

    constructor(page: any) {
        super(page);
        this.calculatePostageHeader = "h1.ng-binding";
        this.fromPostCode = "#domFrom_value";
        this.toPostCode = "#domTo_value";
        this.submitButton = "#submit-domestic";
        this.postagePageDescription = ".header-container__page-description";
    }

    async validateHeader() {
        await this.waitForTextContent(this.calculatePostageHeader, 'Calculate postage');
    }

    async enterPostCode(fromPost: string, toPost: string) {
        await this.enterInputValue(this.fromPostCode, fromPost);
        await this.enterInputValue(this.toPostCode, toPost);
        await this.click(this.submitButton);
    }

    async validatePageDescriptionHeader(description: string) {
        await this.waitForTextContent(this.postagePageDescription, description);
    }
}

export default calculatePostage;
