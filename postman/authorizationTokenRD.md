- set the token in the main window in variable tab with the name token
- if now want to use the token in any route then just got to that route
- in header set a key named authorization and set it's value {{token}}

- when we use it in the backend
```js
const decoded = jwt.verify(
      req.headers.authorization,  //we will send the token through header
      process.env.JWT_SECRET
    );
  
    req.user = decoded; //=_id,
    //inside decoder we have _id: user._id. and we now set it into req.user
    //so from the controller we will have the _id from req.user
    next();
```

- from the client side

```js
axios.defaults.baseURL = "http://localhost:8000/api/v1";
  axios.defaults.headers.common["Authorization"] = auth?.token
  // if it is passed as bearer token then below code 
  // axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`
```