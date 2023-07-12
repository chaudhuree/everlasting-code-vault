#### pathname will be the current route path. when the route changes, the effect will be triggered and the page will be scrolled to the top.

#### this code is used in the main component of the project, so that it can be used in all pages. for example in the App.js file.

```js
const { pathname } = useLocation();

// Setting page scroll to 0 when changing the route
useEffect(() => {
  document.documentElement.scrollTop = 0;
  document.scrollingElement.scrollTop = 0;
}, [pathname]);
```
