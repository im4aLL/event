export class Storage {
    static method = window.localStorage;

    static setItem(key, value) {
        Storage.method.setItem(key, JSON.stringify(value));
    }

    static getItem(key) {
        return JSON.parse(Storage.method.getItem(key));
    }

    static setItems(array) {
        if (array.length === 0) {
            return;
        }

        array.forEach(item => {
            Storage.setItem(item.key, item.value);
        });
    }

    static getItems(array) {
        if (array.length === 0) {
            return;
        }

        let result = [];

        array.forEach(item => {
            result = [...result, Storage.getItem(item)];
        });

        return result;
    }

    static hasItem(key) {
        return Storage.getItem(key);
    }

    static deleteItem(key) {
        if (Storage.hasItem(key)) {
            Storage.method.removeItem[key];
        }
    }

    static deleteItems(keyArray) {
        if (keyArray.length === 0) {
            return;
        }

        keyArray.forEach(key => {
            Storage.deleteItem(key);
        });
    }

    static flush() {
        Storage.method.clear();
    }
}
