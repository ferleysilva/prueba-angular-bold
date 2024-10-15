export const saveDataInLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getDataFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '{}');
}