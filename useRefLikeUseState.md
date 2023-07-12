> in case of useState we do things like this:

```js
const [number, setNumber] = useState(0);

onClick={() => setNumber(number + 1)}
// or
onClick={() => setNumber(prevNumber => prevNumber + 1)}

```

> in case of useRef we do things like this:

```js
const number = useRef(0);

onClick={() => number.current++}
```
