> add this code in vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
```

> now if i want to fetch data from backend i used this code

```js
const response = await fetch("http://localhost:5000/api/v1/data");
const data = await response.json();
```

> now i can fetch data from backend

```js
const response = await fetch("/api/v1/data");
```
