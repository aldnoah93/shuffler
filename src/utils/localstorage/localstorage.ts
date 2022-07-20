/**
 * Returns the **T** element by a given key
 * @param key locastorage index key
 * @returns a **T** element if found, otherwise, it returns **null**
 */
export const retrive = <T>(key: string): T | null => {
    const itemsAsString = localStorage.getItem(key);

    if(itemsAsString === null) return null;

    const item = JSON.parse(itemsAsString) as T;
    return item;
}

/**
 * Stores or replaces a **T** element
 * @param key locastorage index key
 * @param element **T** element to be stored
 */
export const save = <T>(key: string, element: T): void => {
    const elementAsString = JSON.stringify(element);
    localStorage.setItem(key, elementAsString);
};

/**
 * Removes an stored item if found
 * @param key locastorage index key
 */
export const remove = (key: string): void => {
    localStorage.removeItem(key);
}

/**
 * Checks if local storage is available
 * @returns **true** if local storage is available, otherwise, **false**
 */
export const localStorageAvailable = (): boolean => {
    //https://minderov.com/blog/?go=all/checking-if-localstorage-is-available-in-js/
    // if window.localStorage is not defined, return false right away
    if (window.localStorage) {
        const test = "__localStorageTest__";

        // try to use localStorage, and if it does not give any error, then it is available
        try {
            window.localStorage.setItem(test, test);
            window.localStorage.removeItem(test);
        } catch (ex) {
            return false;
        }
        return true;
    }

    return false;
};