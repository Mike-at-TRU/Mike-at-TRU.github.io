import { MemoryCard } from "./MemoryCard.js";
import { getCardsForRound } from "./fetchCards.js";

const testMeomoryCards = []; //create the test card data that would be sent from the server
for (let index = 0; index < 52; index++) {
    testMeomoryCards.push({
        frontImage: `./assets/Black_Cards/${index}.png`,
        background: `./assets/Black_Cards/background.png`
    });
}



function shuffle(array) {
    const length = array.length;
    let randomPositionToSwap;
    let tempPosition;
    const imutableArray = JSON.parse(JSON.stringify(array));


    for (let i = 0; i < length; i++) {


        randomPositionToSwap = Math.floor(Math.random() * length);
        tempPosition = imutableArray[randomPositionToSwap];
        imutableArray[randomPositionToSwap] = imutableArray[i];
        imutableArray[i] = tempPosition;
    }

    return imutableArray;
}


document.addEventListener(`DOMContentLoaded`, async () => {



    // const cardTemplate = document.querySelector("#cardTemplate"); //ended up just using default button

    const numberOfPairsWithMatches = 1; //will depend on dificulty, hard wired for now

    const numberOfCardsFromServer = 8; //number of random images that will be used

    const usedCards = shuffle(testMeomoryCards).filter((_, index) => index < numberOfCardsFromServer); //random cards that will be used



    const allCardData = usedCards.flatMap(
        ({ frontImage, background }, index) => Array(numberOfPairsWithMatches * 2).fill(0).map(
            (_) => ({ frontImage, background, value: index })
        )
    );

    const shuffledCardData = shuffle(allCardData);
    console.log({ shuffledCardData });

    const cardMap = shuffledCardData.reduce((acc, nextCard, id) => {
        if (!acc.has(`memory-card${id}`)) {
            acc.set(`memory-card${id}`, new MemoryCard(id, nextCard.frontImage, nextCard.background, nextCard.value));
            return acc;
        }
        throw Error("this ID already has been used");
    }, new Map()); //makes a map of the MemoryCard Object with a unique ID and if it somehow isn't unique it will complain

    cardMap.forEach(x => console.log(`${x.id} is ${x.cardValue}`)); //I'm not using the console to cheat, how dare you



    let allTheCardElements = Array.from(cardMap).map(() => document.createElement("button")); //makes a button for each memory card

    //allTheCardElements = allTheCardElements.map((card, identifyer) => card.id = `memory-card${identifyer}`); //why didn't this work?
    allTheCardElements.forEach((card, id) => {
        card.id = `memory-card${id}`; //sets a unique id that is the same as a memory card object
        card.className = 'cards'; //gives them all the same class for css
        card.innerHTML = `<img src='${cardMap.get(card.id).background}' class="memoryCardImage">`; //sets the background image to the background image from the `server`
    });
    const cardDiv = document.querySelector('#cards');
    allTheCardElements.forEach(x => { cardDiv.appendChild(x); }); //adds the card element to the document 

    let lastPickedCardID;
    let lastPickedCardID2;
    let bothCardsFlipped; //is a boolen but isn't set so that no cards being flipped (the start of the game or maybe a match being found) doesn't mess it up
    let gameWon = false; //boolen to see if the win consition is meet


    allTheCardElements.forEach(cardElement => cardElement.addEventListener('click', () => {
        const id = cardElement.id;
        const card = cardMap.get(id);

        if (id === lastPickedCardID && !bothCardsFlipped) {
            console.log('Sorry, That last card was already chosen, please choose another card');
        }

        else if (!(card.isFilped())) {

            if (bothCardsFlipped) {
                flipLastCardsBack();

            }
            card.reveal();
            cardElement.innerHTML = `<img src='${card.frontImage}' class="memoryCardImage">`;
            //card.cardValue;
            bothCardsFlipped = returnNotBool(bothCardsFlipped);

            if (bothCardsFlipped) {
                checkForMatches(id, lastPickedCardID);
            }
            lastPickedCardID2 = lastPickedCardID;
            lastPickedCardID = id;


        }



    }));


    function returnNotBool(boolToCheck) {
        if (boolToCheck == null || boolToCheck === true) {
            return false; //null/undefined are no cards flipped false is one and true is 2
        }
        return true;
    }

    function checkForMatches(cardOneID, cardTwoID) {
        const cardOne = cardMap.get(cardOneID);
        const cardTwo = cardMap.get(cardTwoID);
        if (cardOne.isEqual(cardTwo)) {
            const cardButtons = [document.querySelector(`#${cardOneID}`), document.querySelector(`#${cardTwoID}`)];

            cardOne.remove();
            cardTwo.remove();
            cardButtons.forEach(x => {
                x.innerHTML = "";
                x.classList.add("REMOVED");
                console.log(x);
            });
            bothCardsFlipped = null;
            checkForGameWon();
        }

    }

    function flipLastCardsBack() {
        document.querySelector(`#${lastPickedCardID}`).innerHTML = `<img src='${cardMap.get(lastPickedCardID).background}' class="memoryCardImage">`;
        document.querySelector(`#${lastPickedCardID2}`).innerHTML = `<img src='${cardMap.get(lastPickedCardID2).background}' class="memoryCardImage">`;
        cardMap.get(lastPickedCardID).hide();
        cardMap.get(lastPickedCardID2).hide();



    }
    function checkForGameWon() {
        gameWon = true;
        cardMap.forEach(card => {
            if (!card.isRemoved()) {
                console.log('made it in');
                gameWon = false;
            }
        });

        if (gameWon === true) {
            allTheCardElements.forEach(cardElement => cardElement.parentNode.removeChild(cardElement));
            const winscreenPlaceHolder = document.querySelector(`.winScreen`);
            const gameWonScreen = document.createElement(`h1`);
            gameWonScreen.textContent = "Congrats";
            gameWonScreen.classList += `gameWonScreen`;
            winscreenPlaceHolder.appendChild(gameWonScreen);
        }
    }












});