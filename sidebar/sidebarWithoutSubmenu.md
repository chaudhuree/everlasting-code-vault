## MasterLayOut.js

```js
import React, { Fragment, useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  AiOutlineCheckCircle,
  AiOutlineEdit,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { BsHourglass, BsListNested } from "react-icons/bs";
import logo from "../../assets/images/logo.svg";
import { MdOutlineCancelPresentation, RiDashboardLine } from "react-icons/all";
import { getUserDetails, removeSessions } from "../../helper/SessionHelper";

const MasterLayout = (props) => {
  let contentRef,
    sideNavRef = useRef();

  const onLogout = () => {
    removeSessions();
  };

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
    }
  };

  return (
    <Fragment>
      <Navbar className="fixed-top px-0 shadow-sm ">
        <Container fluid={true}>
          <Navbar.Brand>
            {/* sidebar open close icon */}
            <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}>
              <AiOutlineMenuUnfold />
            </a>
            {/* navbar logo */}
            <img className="nav-logo mx-2" src={logo} alt="logo" />
          </Navbar.Brand>

          {/* navbar profile image and dropdown */}
          <div className="float-right h-auto d-flex">
            <div className="user-dropdown">
              <img
                className="icon-nav-img icon-nav"
                src={getUserDetails()["photo"]}
                alt=""
              />
              <div className="user-dropdown-content ">
                <div className="mt-4 text-center">
                  <img
                    className="icon-nav-img"
                    src={getUserDetails()["photo"]}
                    alt=""
                  />
                  <h6>{getUserDetails()["firstName"]}</h6>
                  <hr className="user-dropdown-divider  p-0" />
                </div>
                <NavLink to="/Profile" className="side-bar-item">
                  <AiOutlineUser className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Profile</span>
                </NavLink>
                <a onClick={onLogout} className="side-bar-item">
                  <AiOutlineLogout className="side-bar-item-icon" />
                  <span className="side-bar-item-caption">Logout</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
      {/* navbar finished */}

      {/* sidebar starts */}
      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open"
      >
        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/"
          end
        >
          <RiDashboardLine className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Dashboard</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/Create"
        >
          <AiOutlineEdit className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Create New</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/All"
        >
          <BsListNested className="side-bar-item-icon" />
          <span className="side-bar-item-caption">New Task</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/Progress"
        >
          <BsHourglass className="side-bar-item-icon" />
          <span className="side-bar-item-caption">In Progress</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/Completed"
        >
          <AiOutlineCheckCircle className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Completed</span>
        </NavLink>

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/Canceled"
        >
          <MdOutlineCancelPresentation className="side-bar-item-icon" />
          <span className="side-bar-item-caption">Canceled</span>
        </NavLink>
      </div>

      {/* for content part */}
      <div ref={(div) => (contentRef = div)} className="content">
        {props.children}
      </div>
    </Fragment>
  );
};

export default MasterLayout;
```

## MasterLayOut.css

```css
/* navbar related css starts */
.icon-nav {
  padding: 6px;
  transition: 0.3s;
  color: #606060;
}
.icon-nav:hover {
  transition: 0.3s;
  color: #363b64;
}
.icon-nav:active {
  border-radius: 50%;
  padding: 8px;
  transition: 0.3s;
  color: #363b64;
  background: rgba(0, 0, 0, 0.16);
}
.icon-nav-img {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  object-fit: cover;
}
.icon-nav-img-lg {
  border-radius: 50%;
  width: 85px;
  height: 85px;
  object-fit: cover;
}

/* sidebar related css starts */
.side-nav-open {
  padding-top: 70px;
  height: 100%;
  width: 240px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.3s;
  background-color: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.075);
  scrollbar-color: #cccccc #f5f5f5;
  scrollbar-width: thin;
}
.side-nav-close {
  padding-top: 70px;
  height: 100%;
  width: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.3s;
  background-color: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.075);
  scrollbar-color: #cccccc #f5f5f5;
  scrollbar-width: thin;
}
.side-nav-open::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.side-nav-open::-webkit-scrollbar-track-piece {
  background-color: #f5f5f5;
}
.side-nav-open::-webkit-scrollbar-thumb:vertical {
  height: 30px;
  border-radius: 4px;
  background: #cccccc;
}
.side-nav-close::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.side-nav-close::-webkit-scrollbar-track-piece {
  background-color: #f5f5f5;
}
.side-nav-close::-webkit-scrollbar-thumb:vertical {
  height: 30px;
  border-radius: 4px;
  background: #cccccc;
}

/*  main content related css */

.content {
  transition: 0.3s;
  margin-top: 80px;
  margin-left: 240px;
}
.content-expand {
  margin-top: 80px;
  transition: 0.3s;
  margin-left: 0;
}

.nav-logo {
  width: auto;
  height: 30px;
}

.side-bar-item {
  display: inline-block;
  padding: 12px 5px 12px 5px;
  width: 100% !important;
}
.side-bar-item:hover {
  border-left: 4px solid #cb0c9f;
  transition: 0.2s;
  background-color: #f3d9ec;
}
.side-bar-item:hover .side-bar-item-icon {
  color: #363b64;
}
.side-bar-item:hover .side-bar-item-caption {
  color: #363b64;
}
.side-bar-item-active {
  border-left: 4px solid #cb0c9f;
  background-color: #f3d9ec;
}
.side-bar-item-icon {
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 500;
  color: #363b64;
}
.side-bar-item-caption {
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  margin-left: 5px;
  font-weight: 500;
  color: #363b64;
}

/* Responsive */

@media (max-width: 339.98px) {
  .side-nav-open {
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .side-nav-close {
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .content {
    width: 100%;
    margin-left: 0;
  }
  .content-expand {
    width: 100%;
    margin-left: 180px;
  }
}

@media (min-width: 340px) and (max-width: 360.98px) {
  .side-nav-open {
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .side-nav-close {
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .content {
    width: 100%;
    margin-left: 0;
  }
  .content-expand {
    width: 100%;
    margin-left: 180px;
  }
}

@media (min-width: 361px) and (max-width: 575.98px) {
  .side-nav-open {
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .side-nav-close {
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .content {
    width: 100%;
    margin-left: 0;
  }
  .content-expand {
    width: 100%;
    margin-left: 180px;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .side-nav-open {
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .side-nav-close {
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .content {
    width: 100%;
    margin-left: 0;
  }
  .content-expand {
    width: 100%;
    margin-left: 180px;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .side-nav-open {
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .side-nav-close {
    width: 180px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
  }
  .content {
    width: 100%;
    margin-left: 0;
  }
  .content-expand {
    width: 100%;
    margin-left: 180px;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
}

@media (min-width: 1200px) {
}
```

> ## now amra jekhane jekhane master layout use korte chaibo sekhane just component ta k MasterLayout dea wrap kore dite hobe 
> for example suppose amader Dashboard page a amra master layout ta chai tahole coding sample.

> ## Dashboard.js

```js
import React from "react";
import MasterLayout from "MasterLayout";

const Dashboard = () => {
  return (
    <MasterLayout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};

```

# and must jehutu aikhanne routing  ase so app.js a agei routing kore dite hobe

> ## App.js

```js
import React, { Fragment } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/Dashboard-Page";
import CreatePage from "./pages/Create-Page";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/Create" element={<CreatePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};
```