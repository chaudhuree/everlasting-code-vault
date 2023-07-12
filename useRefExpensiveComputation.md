```js
import React,{useRef} from 'react';
const App=()=>{
  const expensiveResultRef = useRef(null);
  const myDivRef = useRef(null);

  const fetchData=async()=>{
    const result = await fetch('https://jsonplaceholder.typicode.com/todos');
    expensiveResultRef.current = await result.json();
   
  }
  const showData=()=>{
    myDivRef.current.innerHTML = JSON.stringify(expensiveResultRef.current);
  }

  return(
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={showData}>Show Data</button>
      <div ref={myDivRef}></div>
    </div>
  )
}
```