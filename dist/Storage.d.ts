export class Storage {
    static method: globalThis.Storage;
    static setItem(key: any, value: any): void;
    static getItem(key: any): any;
    static setItems(array: any): void;
    static getItems(array: any): any[] | undefined;
    static hasItem(key: any): any;
    static deleteItem(key: any): void;
    static deleteItems(keyArray: any): void;
    static flush(): void;
}
