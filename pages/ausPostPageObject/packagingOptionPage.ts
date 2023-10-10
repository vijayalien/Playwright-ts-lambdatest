import basePageObject from "../basePageObjects";

class packagingOptionPage extends basePageObject {
    packagingOptionsHeaderElement: string;
    cardsBoxesShopNowElement: string;
    boxescardsTitle: string;

    constructor(page: any) {
        super(page);
        this.packagingOptionsHeaderElement = "h1.cpb__heading-h1";
        this.cardsBoxesShopNowElement = "[data-category='card|boxes-and-bags|btn']";
        this.boxescardsTitle = '[data-catalog-name="Boxes, Bags and Other Packaging"]';
    }

    async validateHeader() {
        await this.waitForTextContent(this.packagingOptionsHeaderElement, 'Packaging options');
    }

    async clickOnCardsBoxesShopNow() {
        await this.clickAndLog(this.cardsBoxesShopNowElement);
    }

    async validateTitle() {
        await this.assertIsVisible(this.boxescardsTitle);
    }
}

export default packagingOptionPage;
