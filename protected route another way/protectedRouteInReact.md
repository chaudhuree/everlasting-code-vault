## just checking either token is availabel or not

> if availabe then in to protected route

> otherwise in to login page

> #### this is mainly used in dashboard like page

```js
  getToken(){
        return localStorage.getItem("token")
    }
```

```js
import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Page404 from "./pages/NotFound/Page404";
import LoginPage from "./pages/Users/LoginPage";
import RegistrationPage from "./pages/Users/RegistrationPage";
import ProfilePage from "./pages/Users/ProfilePage";

const App = () => {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<DashboardPage />} />
            }/>
            <Route exact path="/Profile" element={<ProfilePage />} />} />}/>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/Login" replace />} />
            <Route exact path="/Login" element={<LoginPage />} />} />}/>
            <Route exact path="/Registration" element={<RegistrationPage />} />}
            />}/>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullscreenLoader />
      </Fragment>
    );
  }
};
export default App;
```
