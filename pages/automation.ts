import homePage from "../pages/ausPostPageObject/homePage";
import calculatePostage from "../pages/ausPostPageObject/calculatePostage";
import redirectMail from "../pages/ausPostPageObject/redirectMail";
import sendingPage from "./ausPostPageObject/sendingPage";
import packagingOptionPage from "./ausPostPageObject/packagingOptionPage";

class automation {
    page: any;

    constructor(page: any) {
        console.log('In automation page');
        this.page = page;
    }

    get homePage() {
        return new homePage(this.page);
    }

    get calculatePostage() {
        return new calculatePostage(this.page);
    }

    get redirectMail() {
        return new redirectMail(this.page);
    }

    get sendingPage() {
        return new sendingPage(this.page);
    }

    get packagingOptionPage() {
        return new packagingOptionPage(this.page);
    }
}

export default automation;
