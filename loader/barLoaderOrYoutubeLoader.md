> filename:FullscreenLoader.jsx

```js
import React, { Fragment } from "react";
const FullscreenLoader = ({ settings = "d-none" }) => {
  {
    /*
    setting value is d-none 
    if we want to show the loader then we will have to pass the setting value as empty string
  */
  }
  return (
    <Fragment>
      <div className={settings + " LoadingOverlay"}>
        <div className="Line-Progress">
          <div className="indeterminate" />
        </div>
      </div>
    </Fragment>
  );
};
export default FullscreenLoader;
```

> file name: progressbar.css

> - add this file to the index.html file or pase this css in the main.css file

```css
/* progress bar css */
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 85vh;
}
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
  background-color: var(--bs-dark);
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

#### usage

now if we want to use this loader in a page then setup:

```js
// import the loader
import FullscreenLoader from "../fullscreenloader/fullscreenloader";

//set state for loader
const [loading, setLoading] = useState(false);

// now in the main return function reender the component

<FullscreenLoader settings={loading ? "" : "d-none"} />;
```

## full demo

```js
import axios from "axios";
import React, { useState } from "react";
import FullscreenLoader from "../fullscreenloader/fullscreenloader";

export default function Login() {
  // state
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.get(`dummyjson.com`);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <FullscreenLoader settings={loading ? "" : "d-none"} />
      <div>this is a dummy component to illustrate loader</div>
    </div>
  );
}
```
