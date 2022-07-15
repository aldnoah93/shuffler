export interface IChunk<T> {
    //T type is used as we don't really care about the type as long
    //it is contained in an array in this specific scenario
    (array: Array<T>, size: number): Array<Array<T>>;
}

/**
 * This class helps grouping element in groups of a given size
 */
export function chunkHelper<T>(array: Array<T>, size: number): Array<Array<T>>{
    return Array.from({ length: Math.ceil(array.length / size)}, (_:T, i:number) => array.slice(i * size, i * size + size));
}

