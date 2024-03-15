export class MemoryCard {
    #isFliped = false;
    #isRemoved = false;

    constructor(id, frontImage, background, cardValue) {
        this.id = id;
        this.frontImage = frontImage;
        this.background = background;
        this.cardValue = cardValue; //this was privite and I couldn't understand why it kept saying undefined 
    }




    hide() {
        this.#isFliped = false;
    }

    reveal() {
        this.#isFliped = true;
    }

    isFilped() {
        return this.#isFliped;
    }

    isEqual(memoryCardToCheck) {
        return this.cardValue === memoryCardToCheck.cardValue;
    }

    remove() {
        this.#isRemoved = true;
    }

    isRemoved() {
        return this.#isRemoved;
    }
    // connectedCallback() {
    //     //get the template
    //     const template = document.querySelector("#cardTemplate");

    //     //clone it's content
    //     const contentNode = template.content.cloneNode(true);

    //     //bind some data


    //     //TODO Populate the 


    //     //append to DOM
    //     this.appendChild(contentNode);
    // }
    // toString() {
    //     return `id:${identifyer} frontImage:${this.frontImage} background:${this.background} cardValue:${this.cardValue}`;
    // }

}






