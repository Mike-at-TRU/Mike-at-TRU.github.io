export function shuffle(array) {
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