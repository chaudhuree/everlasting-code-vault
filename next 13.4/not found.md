## for global not found route. create a file with name not-found and then give logic or design in it.

```js
not-found.jsx

export default not-found=()=>{
    return <h1>this page is not available</h1>
}
```

> now for route based not found page

```js
// app>about>
// now app er vitore about page ase. akhn amra chaiteci about page er notfound page alada houk.so then do this

// app>about > [...not-found]
// about folder er vitore akta folder banaite hobe 
// [...not-found]
// [...not-found] er vitore page.jsx a not found related code likhte hobe.
// [...not-found]> page.jsx

export default aboutnotfound=()=>{
    return <h2>about page is not found</h2>
}
```