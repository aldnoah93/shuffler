export const retrive = <T>(key: string): T | null => {
    const itemsAsString = localStorage.getItem(key);

    if(itemsAsString === null) return null;

    const items = JSON.parse(itemsAsString) as T;
    return items;
}

export const save = <T>(key: string, element: T): void => {
    const elementAsString = JSON.stringify(element);
    localStorage.setItem(key, elementAsString);
};