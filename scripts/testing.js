import { Test } from "./test.js";
customElements.define("test-modual", Test);
document.addEventListener(`DOMContentLoaded`, () => {
    const test = document.createElement("test-modual");
    const cardTemplate = document.querySelector("#cardTemplate");

    console.log(test);
    // const background = 'background';
    // const frontImage = 'frontImage';
    // const cardValue = 'cardValue';
    // const id = 'id';
    // test.addAllData(id, frontImage, background, cardValue);
    // console.log(test);


});