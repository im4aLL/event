"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
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
