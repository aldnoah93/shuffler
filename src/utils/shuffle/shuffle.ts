export interface IShuffle<T> {
    //T type is used as we don't really care about the type as long
    //it is contained in an array in this specific scenario
    (array:Array<T>) : Array<T>;
}

/**
 * This class implements Fisher-Yates shuffle algorithm
 * See more: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
 * https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
 */
export function fisherYatesShuffle<T>(array:Array<T>) : Array<T>{
    const _array: Array<T> = [...array]; //This is not a deep cloned array
    for(let i = _array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [_array[i], _array[j]] = [_array[j], _array[i]];
    }
    return _array;
}

