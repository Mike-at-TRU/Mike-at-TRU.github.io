export class Test extends HTMLElement {
    constructor() {
        super();
    }
    addID(id) {
        this.identifyer = id;
        return this;
    }
    addFrontImage(frontImage) {
        this.frontImage = frontImage;
        return this;
    }
    addBackground(background) {
        this.background = background;
        return this;
    }
    addCardValue(cardValue) {
        this.cardValue = cardValue;
        return this;
    }

    addAllData(id, frontImage, background, cardValue) {
        this.addID(id);
        this.addFrontImage(frontImage);
        this.addBackground(background);
        this.addCardValue(cardValue);

    }
}