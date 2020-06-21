export class Store {
    static data: {};
    static storageClass: any;
    static eventClass: any;
    static storeKey: string;
    static all(): {};
    static setItem(key: any, value: any): void;
    static getItem(key: any): any;
    static setItems(array: any): void;
    static getItems(array: any): any[] | undefined;
    static hasItem(key: any): boolean;
    static deleteItem(key: any): void;
    static deleteItems(keyArray: any): void;
    static flush(): void;
    static registerStorage(storageClass: any): void;
    static saveToStorage(updatedKeyName: any): void;
    static getInitialValue(): void;
    static registerEvent(EventClass: any): void;
    static register(settings: any): void;
}
