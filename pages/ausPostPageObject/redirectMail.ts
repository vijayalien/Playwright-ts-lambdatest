import basePageObject from "../basePageObjects";

class redirectMail extends basePageObject {
    redirectMailHeader: string;
    redirectMailLink: string;
    concessionTabHeader: string;
    concessionTabApplyButton: string;

    constructor(page: any) {
        super(page);
        this.redirectMailHeader = "h1 .rte-wrapper";
        this.redirectMailLink = "#card-title-id-0";
        this.concessionTabHeader = "#card-title-id-1";
        this.concessionTabApplyButton = "a[data-category='card|concession|btn']";
    }

    async validateRedirectOrHoldEmailHeader() {
        await this.assertIsVisible(this.redirectMailHeader);
    }

    async clickOnRedirectMail() {
        await this.click(this.redirectMailLink);
        await this.assertIsVisible(this.redirectMailHeader);
    }

    async validateRedirectEmailHeader() {
        await this.waitForTextContent(this.redirectMailHeader, 'Redirect mail');
    }

    async clickOnConcessionTab() {
        await this.waitForTextContent(this.concessionTabHeader, 'Concession');
        await this.click(this.concessionTabApplyButton);
    }
}

export default redirectMail;
