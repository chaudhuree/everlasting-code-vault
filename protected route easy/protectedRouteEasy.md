## here all route is protected route. one is admin route and another is logged in route

### for this we can create a components like ProtectedRoute and AdminRoute

```js
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BillsPage from "./pages/BillsPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import CutomerPage from "./pages/CutomerPage";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import SingleItemPage from "./pages/SingleItemPage";

function App() {
  axios.defaults.headers.common["Authorization"] = JSON.parse(
    localStorage.getItem("auth")
  )?.token;
  axios.defaults.baseURL = "https://ecom-hub.onrender.com/api/v1";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute path='/'>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route path="/category" element={<CategoryPage />} />
          <Route
            path="/items"
            element={
              <AdminRoute path="/items">
                <ItemPage />
              </AdminRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute path="/cart">
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute path="/bills">
                <BillsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <AdminRoute path="/customers">
                <CutomerPage />
              </AdminRoute>
            }
          />
          <Route
            path="/item/:id"
            element={
              <ProtectedRoute path="/item/:id">
                <SingleItemPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginRegisterPage />} />

          <Route path="/register" element={<LoginRegisterPage />} />
          <Route path="/loginreg" element={<LoginRegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

export function ProtectedRoute({ children,path }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    localStorage.setItem("intendedRoute", path);
    return <Navigate to="/loginreg" />;
  }
}

export function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("auth"));
  if (user.user?.role === 1) {
    return children;
  } else {
    localStorage.setItem("intendedRoute", path);
    return <Navigate to="/" />;
  }
}
```

## Login page

```js 
import {useNavigate} from 'react-router-dom'
  const handleLogin = () => {
    const navigate = useNavigate();
    // Perform login logic here

    // Redirect to the intended route or a default route
    const intendedRoute = localStorage.getItem("intendedRoute") || "/";
    navigate(intendedRoute);
  };
```