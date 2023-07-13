## Loader.jsx file

```js
import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </div>
  );
}
```

## Loader.css file

```css
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  z-index: 1000;
}

.bar {
  display: inline-block;
  width: 3px;
  height: 20px;
  background-color: #7f81ff;
  border-radius: 10px;
  animation: scale-up4 1s linear infinite;
}

.bar:nth-child(2) {
  height: 35px;
  margin: 0 5px;
  animation-delay: 0.25s;
}

.bar:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes scale-up4 {
  20% {
    background-color: #ccc;
    transform: scaleY(1.5);
  }

  40% {
    transform: scaleY(1);
  }
}
```

> ## rendering the loader in App.js file

```js
import "./App.css";
import React, { useState } from "react";
import OtherRequiredComponent from "./components/OtherRequiredComponent";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return <>{loading ? <Loader /> : <OtherRequiredComponent />}</>;
}

export default App;
```
