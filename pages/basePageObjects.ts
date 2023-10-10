const { test, expect } = require('@playwright/test');

class basePageObject {
    page: any;

    constructor(page: any) {
        this.page = page;
    }

    async navigateToUrl(url: string) {
        await this.page.goto(url);
    }

    async waitForElement(locator: string) {
        await this.page.locator(locator, { timeout: 20000 });
    }

    async enterInputValue(locator: string, inputText: string) {
        await this.page.fill(locator, inputText);
    }

    async waitForTextContent(locator: string, text: string) {
        await this.page.locator(locator, { timeout: 20000 });
        await expect(this.page.locator(locator)).toContainText(text);
    }

    async waitForAndClickText(locator: string, text: string) {
        await this.page.locator(locator, { timeout: 20000 });
        const element = await this.page.locator(locator).filter({ hasText: text });
        await element.first().click();
        await this.waitForLoadState();
    }

    async waitForIndexElement(locator: string, index: number) {
        await this.page.locator(locator, { timeout: 20000 });
        await this.page.locator(locator).nth(index);
    }

    async waitForEnabledElement(locator: string) {
        await this.page.locator(locator, { timeout: 20000 });
        const element = await this.page.locator(locator);
        await expect(element).toBeVisible();
        await expect(element).toBeEnabled();
    }

    async waitForElementWithoutAssert(locator: string) {
        await this.page.locator(locator, { timeout: 10000 });
    }

    async switchContext(frameLocator: string) {
        const frame = await this.page.waitForSelector(frameLocator, { timeout: 10000 });
        await this.page.context().switchToFrame(frame);
    }

    async getText(locator: string) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        return this.page.locator(locator).textContent();
    }

    async waitForElementToDisappear(locator: string) {
        await this.page.waitForSelector(locator, { timeout: 7500, state: 'detached' });
    }

    async clickAndLog(locator: string) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        await this.page.click(locator);
        await this.page.waitForTimeout(2000);
        console.log(`Clicked ${locator}`);
        await this.waitForLoadState();
    }

    async click(locator: string) {
        await this.page.click(locator);
        await this.waitForLoadState();
    }

    async typeSlowly(locator: string, text: string) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        await this.page.locator(locator).clear();
        for (const character of text) {
            await this.page.locator(locator).type(character, { delay: 100 });
        }
    }

    async assertIsVisible(locator: string) {
        const element = this.page.locator(locator);
        await expect(element).toBeVisible();
    }

    async selectOption(locator: string, value: string) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        await this.page.selectOption(locator, value);
    }

    async hoverAndClick(hoverLocator: string, clickLocator: string) {
        await this.page.waitForSelector(hoverLocator, { timeout: 20000 });
        await this.page.waitForSelector(clickLocator, { timeout: 20000 });
        await this.page.hover(hoverLocator);
        await this.page.click(clickLocator);
        await this.waitForLoadState();
    }

    async isVisible(locator: string) {
        return await this.page.isVisible(locator, { timeout: 30000 });
    }

    async printPageSource() {
        const html = await this.page.content();
        console.log('Page source:', html);
    }

    async printElementText(locator: string) {
        const text = await this.page.locator(locator).textContent();
        console.log('Element text:', text);
    }

    async textIncludes(locator: string, text: string) {
        await expect(this.page.locator(locator)).toContain(text);
    }

    async parentTextIncludes(locator: string, text: string) {
        const parent = this.page.locator(locator).first().parent();
        await expect(parent).toContainText(text);
    }

    async searchTableRows(tableLocator: string, name: string) {
        const rows = this.page.locator(tableLocator).all();
        for (const row of rows) {
            const text = await row.textContent();
            if (text.includes(name)) {
                console.log(`Found ${name} in row: ${text}`);
            }
        }
    }

    async searchAndClickTableRow(tableLocator: string, name: string, clickLocator: string) {
        const rows = await this.page.locator(tableLocator).all();
        for (const row of rows) {
            const text = await row.textContent();
            if (text.includes(name)) {
                await row.locator(clickLocator).first().click();
                console.log(`Clicked ${clickLocator} in row with text: ${text}`);
                break;
            }
        }
    }

    async findAndClickChild(parentLocator: string, childLocator: string) {
        const parent = this.page.locator(parentLocator);
        const child = parent.locator(childLocator);
        await child.click();
    }

    async filterLocator(parentLocator: string, childLocator: string) {
        return this.page.locator(parentLocator).locator(childLocator);
    }

    async waitForLoadState() {
        const currentUrl = await this.page.url();
        console.log(currentUrl);
        await this.page.waitForURL(currentUrl, { timeout: 30000 });
        await this.page.waitForLoadState('domcontentloaded');
    }

    async getByLabelandClick(locator: string) {
        await this.page.getByLabel(locator).click();
    }

    async getByLabelandFill(locator: string, inputValue: string) {
        await this.page.getByLabel(locator).fill(inputValue);
    }

    async getByAltTextandClick(locator: string) {
        await this.page.getByAltText(locator).click();
    }

    async getByPlaceholderandFill(locator: string, inputText: string) {
        await this.page
            .getByPlaceholder(locator)
            .fill(inputText);
    }

    async getByRoleandClick(locator: string, locatorName: string) {
        await this.page.getByRole(locator, { name: locatorName }).click();
    }

    async getByTestIdandClick(locator: string) {
        await this.page.getByTestId(locator).click();
        await this.waitForLoadState();
    }

    async getByTitleAndClick(locator: string) {
        await this.page.getByTitle(locator).click();
        await this.waitForLoadState();
    }

    async getByTitleAndValidateText(title: string, text: string) {
        await expect(this.page.getByTitle(title)).toHaveText(text);
    }

    async getAndValidatePageTitle(expectedTitle: string) {
        const pageTitle = await this.page.title();
        expect(pageTitle).toEqual(expectedTitle);
    }
}

export default basePageObject;
