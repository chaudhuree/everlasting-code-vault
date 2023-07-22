## localstoragehook.js
```js
import  { useState } from "react";
// Custom hook for using local storage
const  useLocalStorage = (key, defaultValue) => {
  // Check if local storage is available in the browser
  const isLocalStorageSupported = typeof Storage !== "undefined";

  // Initialize the state with data from local storage or default value
  const [data, setData] = useState(() => {
    if (isLocalStorageSupported) {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : defaultValue;
    } else {
      // If local storage is not available, use the default value
      return defaultValue;
    }
  });

  // Function to update the state and the local storage
  const setDataAndLocalStorage = (newData) => {
    setData(newData);
    if (isLocalStorageSupported) {
      localStorage.setItem(key, JSON.stringify(newData));
    }
  };

  return [data, setDataAndLocalStorage];
};

// Custom hook to clear local storage with a given key
const useClearLocalStorage = () => {
  // Function to clear local storage for the given key
  const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  return clearLocalStorage;
};

export  {useLocalStorage,useClearLocalStorage};
```
> usage 

## App.js

```js
import { useLocalStorage, useClearLocalStorage } from "./localstoragehook.js";

export default function App() {
  const [value, setValue] = useLocalStorage("value", 0);
  const [data, setData] = useLocalStorage("myData", []);
  const clearLocalStorageForKey = useClearLocalStorage();

  const handleIncrement = () => {
    // setValue to update the state and local storage
    setValue(value + 1);
  };

  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: "New Item" };
    // setData to update the array of objects
    setData([...data, newItem]);
  };
  return (
    <div>
      {/* int */}
      <div>
        <p>value: {value}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button
          onClick={() => {
            clearLocalStorageForKey("value");
            setValue(0);
          }}
        >
          clear localstorage int
        </button>
      </div>

      {/* array */}
      <br />
      <div>
        <button onClick={handleAddItem}>Add Item</button>
        <button
          onClick={() => {
            clearLocalStorageForKey("myData");
            setData([]);
          }}
        >
          clear localstorage array
        </button>
        <p>data:</p>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

## note:

```
useClearLocalStorage is used to clear localstoreage 
with a given key value

usage,

const clearLocalStorageForKey = useClearLocalStorage();

then use this clearLocalStorageForKey functon with a key to 
remove any localstoreage data

clearLocalStorageForKey("key")

*********************************
useLocalStorage is used to set data in localstoreage.

usage,

  const [value, setValue] = useLocalStorage("value", 0);
  const [data, setData] = useLocalStorage("myData", []);

here we have, [value,setValue] or, [data,setData] 

value,data is the data stored in the localstorage
setValue,setData is used to set data in localstorage

useLocalStorage("key", default value);

useLocalStorage has two parameter
"key" is to set a key.
another one is for a default value.
it is used while initializing

but, here one point is important, if localstorage already
has any value with that given key in the useClearLocalStorage 
then the value of count/data
will be that already stored value, not the default value.

and if there has no value with this key then default value
will be the main data and it's type will be the type that will
be used to store data
```