#### with bind method
```js
<button onClick={DetailsPopUp.bind(this, item)}>button</button>;
```

#### without bind method
```js
<button onClick={() => DetailsPopUp(item)}>button</button>;
```
