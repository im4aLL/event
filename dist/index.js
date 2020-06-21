"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.Storage = exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event() {
    }
    Event.listen = function (name, callback) {
        if (typeof name === 'function') {
            callback = name;
            name = Event.defaultEventName;
        }
        if (!Event.events[name]) {
            Event.events[name] = [];
        }
        Event.events[name].push(callback);
    };
    Event.listeners = function (eventNames, callback) {
        if (eventNames === void 0) { eventNames = []; }
        if (eventNames.length === 0) {
            return;
        }
        eventNames.forEach(function (name) {
            Event.listen(name, callback);
        });
    };
    Event.dispatch = function (name, arg, updatedKeyName) {
        if (updatedKeyName === void 0) { updatedKeyName = null; }
        if (Event.events[name]) {
            Event.events[name].forEach(function (callback) {
                if (arg) {
                    if (Event.defaultEventName) {
                        if (updatedKeyName) {
                            callback.call(Event, arg, updatedKeyName);
                        }
                        else {
                            callback.call(Event, arg);
                        }
                    }
                    else {
                        callback.call(Event, name, arg);
                    }
                }
                else {
                    callback.call(Event, name);
                }
            });
        }
    };
    Event.removeListener = function (name) {
        if (Event.events[name]) {
            delete Event.events[name];
        }
    };
    Event.removeListeners = function (eventNames) {
        if (eventNames === void 0) { eventNames = []; }
        if (eventNames.length === 0) {
            return;
        }
        eventNames.forEach(function (name) {
            Event.removeListener(name);
        });
    };
    Event.events = [];
    Event.defaultEventName = null;
    return Event;
}());
exports.Event = Event;
var Storage = /** @class */ (function () {
    function Storage() {
    }
    Storage.setItem = function (key, value) {
        Storage.method.setItem(key, JSON.stringify(value));
    };
    Storage.getItem = function (key) {
        return JSON.parse(Storage.method.getItem(key));
    };
    Storage.setItems = function (array) {
        if (array.length === 0) {
            return;
        }
        array.forEach(function (item) {
            Storage.setItem(item.key, item.value);
        });
    };
    Storage.getItems = function (array) {
        if (array.length === 0) {
            return;
        }
        var result = [];
        array.forEach(function (item) {
            result = __spreadArrays(result, [Storage.getItem(item)]);
        });
        return result;
    };
    Storage.hasItem = function (key) {
        return Storage.getItem(key);
    };
    Storage.deleteItem = function (key) {
        if (Storage.hasItem(key)) {
            Storage.method.removeItem[key];
        }
    };
    Storage.deleteItems = function (keyArray) {
        if (keyArray.length === 0) {
            return;
        }
        keyArray.forEach(function (key) {
            Storage.deleteItem(key);
        });
    };
    Storage.flush = function () {
        Storage.method.clear();
    };
    Storage.method = window.localStorage;
    return Storage;
}());
exports.Storage = Storage;
var Store = /** @class */ (function () {
    function Store() {
    }
    Store.all = function () {
        return Store.data;
    };
    Store.setItem = function (key, value) {
        var _a;
        var data = __assign(__assign({}, Store.all()), (_a = {}, _a[key] = value, _a));
        Store.data = __assign({}, data);
        Store.saveToStorage(key);
    };
    Store.getItem = function (key) {
        if (Store.data.hasOwnProperty(key)) {
            return Store.data[key];
        }
        return undefined;
    };
    Store.setItems = function (array) {
        if (array.length === 0) {
            return;
        }
        array.forEach(function (item) {
            Store.setItem(item.key, item.value);
        });
    };
    Store.getItems = function (array) {
        if (array.length === 0) {
            return;
        }
        var result = [];
        array.forEach(function (item) {
            result = __spreadArrays(result, [Store.getItem(item)]);
        });
        return result;
    };
    Store.hasItem = function (key) {
        return Store.data.hasOwnProperty(key);
    };
    Store.deleteItem = function (key) {
        if (Store.hasItem(key)) {
            delete Store.data[key];
            Store.saveToStorage(key);
        }
    };
    Store.deleteItems = function (keyArray) {
        if (keyArray.length === 0) {
            return;
        }
        keyArray.forEach(function (key) {
            Store.deleteItem(key);
        });
    };
    Store.flush = function () {
        Store.data = {};
        Store.saveToStorage();
    };
    Store.registerStorage = function (storageClass) {
        Store.storageClass = storageClass;
        Store.getInitialValue();
    };
    Store.saveToStorage = function (updatedKeyName) {
        if (Store.storageClass) {
            Store.storageClass.setItem(Store.storeKey, Store.all());
        }
        if (Store.eventClass) {
            Store.eventClass.dispatch(Store.storeKey, Store.all(), updatedKeyName);
        }
    };
    Store.getInitialValue = function () {
        if (Store.storageClass) {
            var data = Store.storageClass.getItem(Store.storeKey);
            Store.data = __assign({}, data);
        }
    };
    Store.registerEvent = function (EventClass) {
        Store.eventClass = EventClass;
        Store.eventClass.defaultEventName = Store.storeKey;
        Store.onChange = Store.eventClass.listen;
    };
    Store.register = function (settings) {
        if (settings) {
            if (settings.storage) {
                Store.registerStorage(settings.storage);
            }
            if (settings.event) {
                Store.registerEvent(settings.event);
            }
        }
    };
    Store.data = {};
    Store.storageClass = null;
    Store.eventClass = null;
    Store.storeKey = "st_store";
    return Store;
}());
exports.Store = Store;
