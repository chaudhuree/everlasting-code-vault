app a akta protected route ase seta hoitice localhost:5000/dashboard/secret

so kono user akhn jodi oi route a hit kore tahole prothome thake PrivateRoutes a nea jawa hobe.

oikhane check kora hobe authenticated kina. akhn jodi authenticated hoy tahole to take secret route a neye jabe.
```
//axios base url and header a token set korar niom
//⭐⭐ axios config setting
      axios.defaults.baseURL = "http://localhost:8000/api/v1";
      axios.defaults.headers.common["Authorization"] = auth?.token;
```


but akhn jodi authentcated na hoy tahole take Loading page a nea jabe

oikhan a 3 second por take login page a redirect kore dewea hobe..
dewar time a useLocation theke or pathname ta copy kore state akare navigate er moddhe dea pathay dewa hobe.
```
 navigate('/login', { state: location.pathname });
```

so akhn user login page a ache. so login korar por akhn navigate a check kora hobe state a kono path ase kina. jodi thake like akhn ase localhost:5000/dashboard/secret so take secret page a pathay dibe. otherwise take dashboard page a pathay dibe.
```
navigate(location.state || '/dashboard')
```
aitai intended path system in react.

## demonstrate:

> suppose we have many pages, among them we will work with two pages.
> 1. login page
> 2. secret page --> it is a protected route page

### login page:

```js
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

export default function Login() {
  // state
  const [email, setEmail] = useState("chaudhuree@gmail.com");
  const [password, setPassword] = useState("secret");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // context hooks
  const [auth,setAuth]=useAuth()
  const navigate=useNavigate()
  const location=useLocation()
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const {data}=await axios.post(`http://localhost:8000/api/v1/login`, {
      email,
      password,
    });
    console.log(data);
    if (data?.error) {
      toast.error(data.error);
    } else {        
      localStorage.setItem("auth", JSON.stringify(data));
      // note: see in auth.jsx in context folder. data is collected and save in cotext there in useEffect .
        // 🔽🔽this data is also set here manually though it is set in the auth context from the local storage.
        // if we do not white the below code then we can not see the current change in the home page. then we will have to reload the page manually to see the changes
      setAuth({...auth,user: data?.user,token: data.token });
      navigate(location.state || '/')
    }
    } catch (error) {
      console.log(error);    
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### secret page:

```js
import React from 'react'

export default function Secret() {
  return (
    <div>Secret</div>
  )
}
```

### app.jsx:

```js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// - pages
import Secret from './pages/Secret';

// - components
import PrivateRoutes from './components/PrivateRoutes';



function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          // protected routes
          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="secret" element={<Secret/>} /> 
             {/* path: localhost:5000/dashboard/secret */}
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
```

- so we can see home page can be accessed without login. but secret page can not be accessed without login.

- to protect the path we have a component called PrivateRoutes.jsx

- so when user tries to access the protected route then he/she will go to the PrivateRoutes.jsx component first. from private route there it checks if the user is authenticated/logged in - or not. if logged in then it will go to the secret page. otherwise it will go to the loading page. from the loading page it will go to the login page. so it is obvious that after login page. if user successfully log in this time then user may be navigate to any page. like home page. but here is the twist. here while accessing the private page and after checking the user will be redirected to the loading page if not logged in. in this time loading page navigate user to the login page as well pass a state props to the login page.  so after login done the login page check if there is any state props or not. if there is any state props then it will navigate to that page. otherwise it will navigate to the dashboard page. so it is the intended path system.

### PrivateRoutes.jsx:

```js
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import Loading from './Loading'

export default function PrivateRoutes() {
  const [auth, setAuth] = useAuth()
  const [login, setLogin] = useState(false)

  // server side checking
  useEffect(() => {
    const authCheck = async () => {
      // const { data } = await axios.get("http://localhost:8000/api/v1/auth-check",{
      //   headers:{
      //     Authorization: auth?.token,
      //   }
      // });
      // after setting axios config in auth context

      //⭐⭐ axios config setting
      axios.defaults.baseURL = "http://localhost:8000/api/v1";
      axios.defaults.headers.common["Authorization"] = auth?.token;
      
      const { data } = await axios.get("/auth-check");
      if (data.login) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);
  // client side checking
  // useEffect(() => {
  //   if (auth?.token) {
  //     setLogin(true);
  //   } else {
  //     setLogin(false);
  //   }
  // }, [auth?.token])

  return login ? <Outlet /> : <Loading />
}
```

### Loading.jsx:

```js
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Loading() {
  // state
  const [count, setCount] = useState(3);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      navigate('/login', { state: location.pathname });
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
    <b>not authorized</b>: redirecting to home page in {count} seconds
    {/* can be used any kind of gif file here so that it shows animation */}
    </div>
  );
}
```