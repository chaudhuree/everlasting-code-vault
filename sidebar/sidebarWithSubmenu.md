# Procedure

- MasterLayout.js component create kore nite hobe
- MasterLayout.css create korte hobe and MasterLayout a link kore dite hobe.
- App.js a page gulo routing kore dite hobe.
- j j page a MasterLayout use korte chai sekhane Master Layout import kore main file or div ta k Master Layout dea wrap kore dite hobe

> - Done

## MasterLayout.js

```js
import React, { Fragment, useRef } from "react";
import { Accordion, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  AiOutlineBank,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import {
  BsBagPlus,
  BsBagX,
  BsBox,
  BsCartPlus,
  BsCircle,
  BsGraphUp,
  BsPeople,
} from "react-icons/bs";
import {
  AiOutlineUnorderedList,
  IoCreateOutline,
  RiDashboardLine,
  TbTruckDelivery,
} from "react-icons/all";
import logo from "../../assets/images/Logo.svg";
import { getUserDetails, removeSessions } from "../../helper/SessionHelper";
const MasterLayout = (props) => {
  let contentRef,
    sideNavRef,
    topNavRef = useRef();

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    let topNav = topNavRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
      topNav.classList.remove("top-nav-open");
      topNav.classList.add("top-nav-close");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
      topNav.classList.add("top-nav-open");
      topNav.classList.remove("top-nav-close");
    }
  };

  const isSidebarAccordionActive = () => {
    let urlList = [];
    sidebarItems.map((item) => {
      urlList.push(
        item.subMenu.map((subItem) => {
          return subItem?.url;
        })
      );
    });
    return urlList.findIndex((items) =>
      items.includes(window.location.pathname)
    );
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <RiDashboardLine className="side-bar-item-icon" />,
      url: "/",
      subMenu: [],
    },
    {
      title: "Customer",
      icon: <BsPeople className="side-bar-item-icon" />,
      url: "/Customer",
      subMenu: [
        {
          title: "New Customer",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/CustomerCreateUpdatePage",
        },
        {
          title: "Customer List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/CustomerListPage",
        },
      ],
    },
    {
      title: "Supplier",
      icon: <TbTruckDelivery className="side-bar-item-icon" />,
      url: "/Supplier",
      subMenu: [
        {
          title: "New Supplier",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/SupplierCreateUpdatePage",
        },
        {
          title: "Supplier List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/SupplierListPage",
        },
      ],
    },
    {
      title: "Expense",
      icon: <AiOutlineBank className="side-bar-item-icon" />,
      url: "/Expense",
      subMenu: [
        {
          title: "New Expense Type",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ExpenseTypeCreateUpdatePage",
        },
        {
          title: "Expense Type List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ExpenseTypeListPage",
        },
        {
          title: "New Expense",
          icon: <IoCreateOutline size={16} className="side-bar-subitem-icon" />,
          url: "/ExpenseCreateUpdatePage",
        },
        {
          title: "Expense List",
          icon: (
            <AiOutlineUnorderedList
              size={16}
              className="side-bar-subitem-icon"
            />
          ),
          url: "/ExpenseListPage",
        },
      ],
    },
    {
      title: "Product",
      icon: <BsBox className="side-bar-item-icon" />,
      url: "/Product",
      subMenu: [
        {
          title: "New Brand",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/BrandCreateUpdatePage",
        },
        {
          title: "Brand List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/BrandListPage",
        },
        {
          title: "New Category",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/CategoryCreateUpdatePage",
        },
        {
          title: "Category List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/CategoryListPage",
        },
        {
          title: "New Product",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ProductCreateUpdatePage",
        },
        {
          title: "Product List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ProductListPage",
        },
      ],
    },
    {
      title: "Purchase",
      icon: <BsBagPlus className="side-bar-item-icon" />,
      url: "/Purchase",
      subMenu: [
        {
          title: "New Purchase",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/PurchaseCreateUpdatePage",
        },
        {
          title: "Purchase List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/PurchaseListPage",
        },
      ],
    },
    {
      title: "Sale",
      icon: <BsCartPlus className="side-bar-item-icon" />,
      url: "/Sale",
      subMenu: [
        {
          title: "New Sale",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/SalesCreateUpdatePage",
        },
        {
          title: "Sale List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/SalesListPage",
        },
      ],
    },
    {
      title: "Return",
      icon: <BsBagX className="side-bar-item-icon" />,
      url: "/Return",
      subMenu: [
        {
          title: "New Return",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ReturnCreateUpdatePage",
        },
        {
          title: "Return List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ReturnListPage",
        },
      ],
    },
    {
      title: "Report",
      icon: <BsGraphUp className="side-bar-item-icon" />,
      url: "/Report",
      subMenu: [
        {
          title: "Sale Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/SaleReportPage",
        },
        {
          title: "Return Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ReturnReportPage",
        },
        {
          title: "Purchase Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/PurchaseReportPage",
        },
        {
          title: "Expense Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ExpenseReportPage",
        },
      ],
    },
  ];

  const onLogout = () => {
    removeSessions();
  };
  return (
    <Fragment>
      <Navbar className="fixed-top px-0 ">
        <Container fluid={true}>
          <Navbar.Brand>
            <div
              ref={(div) => {
                topNavRef = div;
              }}
              className="top-nav-open"
            >
              <h4 className="text-white m-0 p-0">
                <a onClick={MenuBarClickHandler}>
                  <AiOutlineMenu />
                </a>
              </h4>
            </div>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex align-items-center">
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

      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open border-radius-0 card"
      >
        <NavLink
          to="/"
          end
          className="d-flex justify-content-center sticky-top bg-white"
        >
          <img src={logo} className="logo" />
        </NavLink>

        <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
          {sidebarItems.map((item, index) => {
            return item.subMenu.length !== 0 ? (
              <Accordion.Item
                key={index.toString()}
                eventKey={`${index}`}
                className="mt-2"
              >
                <Accordion.Header>
                  <div className="side-bar-item">
                    {item.icon}
                    <span className="side-bar-item-caption">{item.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.subMenu.map((subItem, index) => (
                    <NavLink
                      key={index.toString()}
                      className={(navData) =>
                        navData.isActive
                          ? "side-bar-subitem-active side-bar-subitem "
                          : "side-bar-subitem"
                      }
                      to={subItem?.url}
                      end
                    >
                      {subItem?.icon}
                      <span className="side-bar-subitem-caption">
                        {subItem?.title}
                      </span>
                    </NavLink>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? "side-bar-item-active side-bar-item mt-2"
                    : "side-bar-item mt-2"
                }
                to={"/"}
                end
              >
                {item.icon}
                <span className="side-bar-item-caption">{item.title}</span>
              </NavLink>
            );
          })}
        </Accordion>
      </div>

      <div ref={(div) => (contentRef = div)} className="content">
        {props.children}
      </div>
    </Fragment>
  );
};

export default MasterLayout;
```

## MasterLayout.css

```css
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

.logo {
  width: 70px;
  margin: 20px;
}
.accordion-button {
  direction: ltr;
  padding: 0;
}
.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  margin-left: -30px;
}
.accordion-button.collapsed::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23666666'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
  margin-left: -30px;
}
.accordion-body {
  padding: 0;
}
.side-nav-open {
  direction: rtl;
  height: 100%;
  width: 220px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.3s;
  background-color: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.075);
  scrollbar-color: #cccccc #f5f5f5 !important;
  scrollbar-width: thin !important;
  z-index: 1030;
}
.side-nav-close {
  direction: rtl;
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
  scrollbar-width: thin !important;
  z-index: 1030;
}
.side-nav-open::-webkit-scrollbar {
  width: 5px;
  height: 5px;
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
.content {
  transition: 0.3s;
  margin-top: 80px;
  margin-left: 220px;
}
.content-expand {
  margin-top: 80px;
  transition: 0.3s;
  margin-left: 0;
}
.top-nav-open {
  margin-left: 220px;
  transition: 0.3s;
}
.top-nav-close {
  margin-left: 0;
  transition: 0.3s;
}
.side-bar-item {
  direction: ltr;
  display: flex;
  padding: 12px 5px 12px 5px;
  width: 100% !important;
  flex-direction: row;
  align-items: center;
  cursor: pointer !important;
}
.side-bar-item:hover {
  border-left: 4px solid var(--bs-green);
  transition: 0.2s;
  background-color: var(--bs-light-green);
}
.side-bar-item:hover .side-bar-item-icon {
  color: var(--bs-green);
}
.side-bar-item:hover .side-bar-item-caption {
  color: var(--bs-green);
}
.side-bar-subitem:hover .side-bar-subitem-caption {
  color: var(--bs-green);
}
.side-bar-item-active {
  border-left: 4px solid var(--bs-green);
  background-color: var(--bs-light-green);
  color: var(--bs-green);
}
.side-bar-item-icon {
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 500;
  color: #444;
}
.side-bar-subitem-icon {
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 500;
  color: #444;
}
.side-bar-item-caption {
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  margin-left: 5px;
  font-weight: 500;
  color: #444;
}
.side-bar-subitem-caption {
  font-family: "Poppins", sans-serif;
  font-size: 12px;
  margin-left: 5px;
  font-weight: 500;
  color: #444;
}
.side-bar-item-active .side-bar-item-caption,
.side-bar-item-active .side-bar-item-icon {
  color: var(--bs-green);
}
.side-bar-subitem {
  cursor: pointer !important;
  direction: ltr;
  display: flex;
  padding: 12px 5px 12px 20px;
  width: 100% !important;
  flex-direction: row;
  align-items: center;
}
.side-bar-subitem:hover {
  border-right: 4px solid var(--bs-green);
  transition: 0.2s;
  background-color: var(--bs-light-green);
}
.side-bar-subitem:hover .side-bar-subitem-icon {
  color: var(--bs-green);
}
.side-bar-subitem-active .side-bar-subitem-caption {
  color: var(--bs-green);
}
.side-bar-subitem-active {
  border-right: 4px solid var(--bs-green);
  background-color: var(--bs-light-green);
  color: var(--bs-green);
}
.side-bar-subitem-active .side-bar-subitem-icon {
  color: var(--bs-green);
}
.navbar-expand {
  align-items: flex-start;
  background-color: var(--bs-green) !important;
}
.navbar-title h5 {
  color: #fff;
  font-weight: 300;
  margin-inline: 10px;
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
    width: 220px;
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
    margin-left: 220px;
  }
  .top-nav-open {
    margin-left: 0;
  }
  .top-nav-close {
    margin-left: 220px;
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
    width: 200px;
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
    margin-left: 200px;
  }
  .top-nav-open {
    margin-left: 0;
  }
  .top-nav-close {
    margin-left: 200px;
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
    width: 200px;
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
    margin-left: 200px;
  }
  .top-nav-open {
    margin-left: 0;
  }
  .top-nav-close {
    margin-left: 200px;
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
    width: 200px;
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
    margin-left: 200px;
  }
  .top-nav-open {
    margin-left: 0;
  }
  .top-nav-close {
    margin-left: 200px;
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
    width: 200px;
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
    margin-left: 200px;
  }
  .top-nav-open {
    margin-left: 0;
  }
  .top-nav-close {
    margin-left: 200px;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
}

@media (min-width: 1200px) {
}
```

### Usage:

```js
import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
// component lazy suspense way te import kora hoitice below code a
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const Dashboard = lazy(() => import("../../components/Dashboard/Dashboard"));
const DashboardPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Dashboard />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default DashboardPage;
```

# App.js a obossoi age sob page gulo k routing kore dite hobe.

```js
import React,{Fragment} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Page404 from "./pages/NotFound/Page404";
import ProfilePage from "./pages/Profile/ProfilePage";

const App = () => {

        return (
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<DashboardPage />}/>}/>
                        <Route exact path="/Profile" element={<ProfilePage/>}/>} />}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </BrowserRouter>
                <FullscreenLoader/>
            </Fragment>
        );

    }
};
export default App;
```
