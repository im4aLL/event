export class Store {
    static data = {};
    static storageClass = null;
    static eventClass = null;
    static storeKey = `st_store`;


    static all() {
        return Store.data;
    }

    static setItem(key, value) {
        const data = {...Store.all(), [key]: value};

        Store.data = {...data};

        Store.saveToStorage();
    }

    static getItem(key) {
        if (Store.data.hasOwnProperty(key)) {
          return Store.data[key];
        }

        return undefined;
    }

    static setItems(array) {
        if (array.length === 0) {
            return;
        }

        array.forEach(item => {
            Store.setItem(item.key, item.value);
        });
    }

    static getItems(array) {
        if (array.length === 0) {
            return;
        }

        let result = [];

        array.forEach(item => {
            result = [...result, Store.getItem(item)];
        });

        return result;
    }

    static hasItem(key) {
        return Store.data.hasOwnProperty(key);
    }

    static deleteItem(key) {
        if (Store.hasItem(key)) {
            delete Store.data[key];

            Store.saveToStorage();
        }
    }

    static deleteItems(keyArray) {
        if (keyArray.length === 0) {
            return;
        }

        keyArray.forEach(key => {
            Store.deleteItem(key);
        });
    }

    static flush() {
        Store.data = {};

        Store.saveToStorage();
    }

    static registerStorage(storageClass) {
        Store.storageClass = storageClass;

        Store.getInitialValue();
    }

    static saveToStorage() {
        if (Store.storageClass) {
            Store.storageClass.setItem(Store.storeKey, Store.all());
        }

        if (Store.eventClass) {
            Store.eventClass.dispatch(Store.storeKey, Store.all());
        }
    }

    static getInitialValue() {
        if (Store.storageClass) {
            const data = Store.storageClass.getItem(Store.storeKey);

            Store.data = {...data};
        }
    }

    static registerEvent(EventClass) {
        Store.eventClass = EventClass;
        Store.eventClass.defaultEventName = Store.storeKey;

        Store.onChange = Store.eventClass.listen;
    }

    static register(settings) {
        if (settings) {
            if (settings.storage) {
                Store.registerStorage(settings.storage);
            }

            if (settings.event) {
                Store.registerEvent(settings.event);
            }
        }
    }
}
