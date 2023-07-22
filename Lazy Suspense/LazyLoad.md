- file lazy suspense dea create korle file ta chunk hishebe ashar poreo code er performance bere jay. and loading time a akta sundor loading animation dekhano jay.

- first a akta lazy loading er loader create kore nite hobe.aita ami full screen loader dekhaiteci but aita j kono vabe loading show korailei hobe.

## LazyLoader.js

```js
import React, { Fragment } from "react";
const LazyLoader = () => {
  return (
    <Fragment>
      <div className="LoadingOverlay">
        <div className="Line-Progress">
          <div className="indeterminate"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default LazyLoader;
```

## LazyLoader.css

```css
/*Line Progress*/
.LoadingOverlay {
  position: absolute;
  display: block;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  z-index: 500000 !important;
  background-color: rgba(255, 255, 255, 0.2);
}
.Line-Progress .indeterminate {
  background-color: #cb0c9f;
}
.Line-Progress .indeterminate:before {
  z-index: -100 !important;
  height: 3px;
  content: "";
  position: fixed;
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: left, right;
  -webkit-animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}
.Line-Progress .indeterminate:after {
  z-index: -100 !important;
  height: 3px;
  content: "";
  position: fixed;
  background-color: inherit;
  top: 0;
  left: 0;
  bottom: 0;
  will-change: left, right;
  -webkit-animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
    infinite;
  animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  -webkit-animation-delay: 1.15s;
  animation-delay: 1.15s;
}
@-webkit-keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}
@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
}
@-webkit-keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}
@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
}
```

- loader create kora done.

## now suppose amader project a akta page ase Dashboard.and amra ai dashboard page a dashboard component lazy loader hishebe load koraite chai then below way te code korte hobe.

## Dashboard.js --> component

```js
import React, { Fragment } from "react";
const Dashboard = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <h1>Dashboard component (Dashboard related codes)</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
```
## Dashboard.js --> page

```js
import React, {Fragment,Suspense,lazy} from 'react';
import MasterLayout from "../components/masterLayout/Master-Layout";
import LazyLoader from "../components/masterLayout/LazyLoader";
//  lazy way te component load kora hoise ✅✅
const Dashboard =lazy(() => import('../components/Dashboard'));
const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
              {/* fallback a LazyLoader loader ta pass koraite hobe */}
                <Suspense fallback={<LazyLoader/>}>
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;
```

## done. aivabe lazy loading er maddhome component show korano hoy.