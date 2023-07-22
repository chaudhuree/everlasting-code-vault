- create a default layout first . it will hold all the sidebar component. then wrap other component inside it in every component.
- like suppose i have page for product show, product create
- so i will wrap product show and product create inside default layout

# usage:

## DefaultLayout.js:

```js
import {
  AppstoreOutlined,
  CopyOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/DefaultLayout.css";
import Spinner from "./Spinner";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);

  const admin = JSON.parse(localStorage.getItem("auth")).user.role === 1;

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  //to get localstorage data
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      {loading && <Spinner />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          {admin === true ? (
            <h1 className="text-center text-light font-wight-bold mt-4">
              Admin
            </h1>
          ) : (
            <h1 className="text-center text-light font-wight-bold mt-4">
              ECOM Hub
            </h1>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/category" icon={<AppstoreOutlined />}>
            <Link to="/category">Category</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon={<CopyOutlined />}>
            <Link to="/bills">Bills</Link>
          </Menu.Item>
          {admin && (
            <>
              <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
                <Link to="/items">Items</Link>
              </Menu.Item>
              <Menu.Item key="/customers" icon={<UserOutlined />}>
                <Link to="/customers">Cutomers</Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("auth");
              navigate("/loginreg");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div
            className="cart-item d-flex jusitfy-content-space-between flex-row"
            onClick={() => navigate("/cart")}
          >
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined />
            </Badge>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
```

## DefaultLayout.css:

```css
/* spinner related css code */
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}

.spinner-border {
  height: 100px;
  width: 100px;
}
/* spinner related css ends */
/* default layout related css starts */
#components-layout-demo-custom-trigger .trigger {
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
  box-shadow: 0 0 3px #ccc;
  border-radius: 5px;
  margin: 10px;
  overflow: auto;
}

.ant-layout-has-sider {
  padding: 5px !important;
}

.ant-layout.ant-layout-has-sider {
  height: 100vh;
}

.ant-layout-sider {
  border-radius: 10px !important;
  padding-top: 10px !important;
}

.anticon svg {
  height: 20px;
  width: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.ant-layout-header {
  line-height: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-item {
  padding-left: 20px;
  padding-right: 30px;
  cursor: pointer;
}
.cart-item p {
  margin-top: 10px;
  font-weight: bold;
}
```

## App.js:

```js
import "antd/dist/antd.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductShow from "./components/ProductShow";
import ProductCreate from "./components/ProductCreate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductShow />} />
          <Route path="/create" element={<ProductCreate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
```

## ProductShow.js:

```js
import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
const ProductShow = () => {
  
  return (
    <DefaultLayout>
      <h1>Product Show related data</h1>
    </DefaultLayout>
  );
};

export default ProductShow;
```
