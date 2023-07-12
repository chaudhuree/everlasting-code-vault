#### for axios base url usage we need to use this code at the top level of the app

> so paste this code either in App.jsx or in case of context api in the context file

```js
// axios config
axios.defaults.baseURL = "https://localhost:5000/api/v1";
axios.defaults.headers.common["Authorization"] = auth?.token;
// if it is passed as bearer token then below code
// axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`
```

- then we can call api like this
- suppose the route is like this: https://localhost:5000/api/v1/users

```js

axios.get("/users");
```
