"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
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
