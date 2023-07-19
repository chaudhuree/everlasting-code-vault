## globally install sass

> method one

```bash
 npm install -g sass
```

- now akta folder a jai and sekhane file create kori.

- index.html
- app.sass

## now terminal a sass watch kori and compile

```bash
 sass --w ./app.sass app.css
  //or
  sass --w .\app.sass app.css
  //or
  sass --w ./app.sass:app.css
  //or
  sass --w app.sass app.css
```

- if any one not work then run another one

> method two

## or vs code a akta extension ase Live Sass Compiler

> method theree

## or to use in react

```bash
npm create vite@latest
```

- react file create kore newa hoilo

```bash
  npm i sass
```

- src er moddhe akta folder banay nite hobe
- styles
- then in styles app.sass

- now app.jsx a ai file ta import kore dilei kaj sesh

```js
import "./styles/app.sass";
```

# installation technique end

> difference between scss and sass

```css

// scss
body{
  background-color: red;
  color: white;
  h1{
    font-size: 20px;
  }
}

// sass no need brackets
body
  background-color: red
  color: white
  h1
    font-size: 20px
```

# syntax

```css
// variable

$color: red;
$colorArray: red, blue, green;
$font-size: 20px;

// usage

body {
  background-color: $color;
  color: white;
  h1 {
    font-size: $font-size;
    color: nth($colorArray, 2);
  }
}
```

## nesting

```css
// nesting

body {
  background-color: red;
  color: white;
  h1 {
    font-size: 20px;
    color: blue;
    &:hover {
      color: green;
    }
    a {
      color: yellow;
    }
  }
}
```

```css
.productCart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {  // direct child
    width: 200px;
    height: 200px;
  }
  img { // all child
    width: 100px;
    height: 100px;
  }
}

// description

<div class="productCart">

  <img src="" alt="" />  // first one > is refets to this direct child

  <div class="description">

    <img src="" alt="" /> // second one is refets to this all child
  </div>
  <div class="category">
    <img src="" alt="" /> // second one is refets to this all child
  </div>
</div>
```

# partials

- partials are used to divide the code into small parts

- \_variables.scss

```css
// file name _ dea start hoite hobe
// _colors.scss
$red: red;
$blue: blue;
$green: green;
```

```css
// now jodi app.scss a use korte chai then import korbo first a

@import "./_colors.scss";

body {
  background-color: $red;
  color: $blue;
  h1 {
    font-size: 20px;
    color: $green;
  }
}
```

## @use method

- suppose we have two partials colorOne and colorTwo
- both of them have color variable with same name but different value. so how can we use it without collision
- here use is used

```css
// _colorOne.scss
$red: red;
$blue: blue;
$green: green;
```

```css
// _colorTwo.scss
$red: darkred;
$blue: skyblue;
$green: palegreen;
```

- now app.scss a use korbo

```css
@use "./_colorOne.scss" as colorOne;
@use "./_colorTwo.scss" as colorTwo;

body {
  background: colorOne.$red;
  color: colorOne.$blue;
  h1 {
    font-size: 20px;
    color: colorTwo.$blue;
    background: colorTwo.$red;
  }
}
```

> now suppose amra akta button item banailam and aitar property onno kono jaygay use korte chai then extend use korte hobe.

```css
.custom {
  padding: 10px;
  color: white;
  background-color: red;
}

.btn {
  @extend .custom;
  background-color: green;
}
```

> or

```css
%custom {
  padding: 10px;
  color: white;
  background-color: red;
}
.btn {
  @extend %custom;
  background-color: yellow;
}
.btn2 {
  @extend %custom;
  background-color: green;
}
```

> dekha jasse background color property ta repetatiohn hocce. so aita theke rehai pawar upay hocce @mixin

## @mixin

```css
@mixin custom($bgcolor: yellow) {
  padding: 10px;
  color: white;
  background-color: $bgcolor;
}

.btn {
  @include custom(red);
}
.btn2 {
  @include custom(green);
}
```

## pseudo class

```css
btn {
  background-color: green;
  &:hover {
    background-color: red;
  }
}
```

## operator

```css
$width: 100px;
$height: 200px;

.description {
  width: $width + 100px;
  height: $height - 100px;
}
```
