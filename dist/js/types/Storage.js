export class Storage {
    constructor() { }
    static save(key, value) {
        const valueToString = JSON.stringify(value);
        localStorage.setItem(key, valueToString);
    }
    static read(key, restore) {
        const value = localStorage.getItem(key);
        if (value === null) {
            return null;
        }
        if (restore) {
            return JSON.parse(value, restore);
        }
        return JSON.parse(value);
    }
}
