```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Intersection Observer</title>
        <link rel="stylesheet" href="./style.css" />
    </head>
    <body>
        <div id="circle"></div>

        <script src="./script.js"></script>
    </body>
</html>
```

```css
div {
    height: 200px;
    width: 200px;
    border-radius: 10%;
    background-color: aqua;
    border: 3px solid pink;
    transition: all 0.5s ease-in-out;
    transform: scale(1.2);
    opacity: 0;
    margin: 0 auto 20px auto;
}

.visible {
    transform: scale(1);
    opacity: 1;
}
```


```js
const circle = document.getElementById("circle");

const observer = new IntersectionObserver(
    (items) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                console.log(item.target, "is visible");
            } else {
                console.log(item.target, "is not visible");
            }
        });
    },
    {
        threshold: 0.5,
    }
);

observer.observe(circle);
```

## to select an element

```html
<div class="element"></div>
```

```js
const element = document.querySelector(".element");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry); // it will show all the element that is being observed.
        console.log(entry.isIntersecting); // is will show either the element is intersecting or not. mean, is it in the viewport or not.
        console.log(entry.target); // it will show the element that is being observed.
}, {
    threshold: 0.5, // it means all the console log will work when the element  is 50% visible in the viewport.
});

observer.observe(element);
```
```