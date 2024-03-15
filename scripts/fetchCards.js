import { MemoryCard } from "./MemoryCard.js";
import { shuffle } from "./shuffle.js";

const backImage = "./assets/Black_Cards/background.png";

const cardData = [];
for (let index = 0; index < 52; index++) {
    cardData.push({
        frontImage: `./assets/Black_Cards/${index}.png`
    });
}

const fetchCards = async (_endpoint) => {
    return Promise.resolve(cardData);
};


export const getCardsForRound = async (difficutly) => {
    const cardsFromServer = await fetchCards();
    console.log(cardsFromServer);
    let numberOfPairsWithMatches;
    let numberOfCardsFromServer;
    switch (difficutly) {
        case `EASY`:
            numberOfPairsWithMatches = 2;
            numberOfCardsFromServer = 4;
            break;
        case `NORMAL`:
            numberOfPairsWithMatches = 1;
            numberOfCardsFromServer = 8;
            break;
        case `HARD`:
            numberOfPairsWithMatches = 1;
            numberOfCardsFromServer = 16;
            break;
        default:
            //throw Error(`not a dificutly`)
            numberOfPairsWithMatches = 1000;
            numberOfCardsFromServer = 52;
    }
    const usedCards = cardsFromServer.filter((_, index) => index < numberOfCardsFromServer); //random cards that will be used
    const allCardData = usedCards.flatMap(
        ({ frontImage, background }, index) => Array(numberOfPairsWithMatches * 2).fill(0).map(
            (_) => ({ frontImage, background, value: index })
        )
    );
    return shuffle(allCardData);
};