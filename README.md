### Demo
- Angular demo - https://codesandbox.io/s/store-angular-89trp
- React demo - https://codesandbox.io/s/store-react-zsz5z
- Vue demo - https://codesandbox.io/s/store-vue-5b6sv

### Install
```cli
npm i @im4all/store --save
```

### Usage

Register store
```js
import { Event, Storage, Store } from '@im4all/store';

// Make sure this line get called only once
// if you are using angular then call inside app.component.ts ngOnInit
Store.register({ storage: Storage, event: Event });
```

### Watch store change
```js
Store.onChange((data, updatedItem) => {
    console.log(data, updatedItem);
});
```

### Add or update an item inside store
```js
Store.setItem('name', 'something');
```

Update multiple items at once
```js
Store.setItems([
    { key: 'b', value: 2 },
    { key: 'c', value: 3 }
]);
```

### Get all item from store
```js
Store.all();
```

### Clear all data from store
```js
Store.flush();
```

