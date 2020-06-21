export class Event {
    static events: any[];
    static defaultEventName: any;
    static listen(name: any, callback: any): void;
    static listeners(eventNames: any[] | undefined, callback: any): void;
    static dispatch(name: any, arg: any, updatedKeyName?: any): void;
    static removeListener(name: any): void;
    static removeListeners(eventNames?: any[]): void;
}
