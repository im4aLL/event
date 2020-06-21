class Event {
    static events = [];
    static defaultEventName = null;

    static listen(name, callback) {
        if (typeof name === 'function') {
            callback = name;
            name = Event.defaultEventName;
        }

        if (!Event.events[name]) {
            Event.events[name] = [];
        }

        Event.events[name].push(callback);
    }

    static listeners(eventNames = [], callback) {
        if (eventNames.length === 0) {
            return;
        }

        eventNames.forEach(name => {
            Event.listen(name, callback);
        });
    }

    static dispatch(name, arg, updatedKeyName = null) {
        if (Event.events[name]) {
            Event.events[name].forEach(callback => {
                if (arg) {
                    if (Event.defaultEventName) {
                        if (updatedKeyName) {
                            callback.call(Event, arg, updatedKeyName);
                        } else {
                            callback.call(Event, arg);
                        }
                    } else {
                        callback.call(Event, name, arg);
                    }
                } else {
                    callback.call(Event, name);
                }
            });
        }
    }

    static removeListener(name) {
        if (Event.events[name]) {
            delete Event.events[name];
        }
    }

    static removeListeners(eventNames = []) {
        if (eventNames.length === 0) {
            return;
        }

        eventNames.forEach(name => {
            Event.removeListener(name);
        });
    }
}

class Storage {
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

class Store {
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

        Store.saveToStorage(key);
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

            Store.saveToStorage(key);
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

    static saveToStorage(updatedKeyName) {
        if (Store.storageClass) {
            Store.storageClass.setItem(Store.storeKey, Store.all());
        }

        if (Store.eventClass) {
            Store.eventClass.dispatch(Store.storeKey, Store.all(), updatedKeyName);
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

export { Event, Storage, Store };
