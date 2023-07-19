## now we are designing a full website.

- we have main file like style.scss
- and three more file to use for like
- \_classes.scss // for a predefined component
- \_mixins.scss // for theming components
- \_variables.scss // for global variables

> ## \_variables.scss

```css
// theme
$current-theme: dark;

// colors
$color-dark-bg: #3b3b41;
$color-light-bg: #f3f3f3;
$color-dark-border: #5250507e;

$color-light: #a2a5b9;
$color-dark: #1d2129;
$color-primary: #385898;
$color-danger: red;
$color-success: green;

$color-chocolate: #b98160;
$color-vanilla: #fae8b6;
$color-strawberry: pink;
$color-orange: orange;
$color-lemon: #5fd592;
$color-tan: tan;

// font
$font-base-size: 14px;
$font-base-family: Helvetica;
```

> ## \_mixins.scss

```css
@mixin bordered($color, $width) {
  border: $width solid $color;
}

@mixin theme($property, $light-color, $dark-color) {
  @if $current-theme == "light" {
    #{$property}: $light-color;
  } @else {
    #{$property}: $dark-color;
  }
}

// usage

@include bordered($color-dark-border, 1px);
@include theme(background-color, $color-light-bg, $color-dark-bg);
-> background-color: #f3f3f3;

// now theme mixin will check first .if the current theme is light then it will use light color otherwise dark color
```

> ## \_classes.scss

```css
.scoop {
  width: 100px;
  height: 80px;
  border-radius: 100%;
  position: relative;
  margin-bottom: -45px;
  z-index: 3;
  &::after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: -10px;
    height: 35px;
    width: 120px;
    border-radius: 100%;
    z-index: 2;
  }
  &:first-of-type {
    margin-bottom: 0px;
  }
  &:hover {
    transform: scale(1.1);
  }
}
```

> # finally the main app.scss

```css
// firstly import all the partials
@import "variables";
@import "mixins";
@import "classes";

body {
  @include theme(background, $color-light-bg, $color-dark-bg);
  @include theme(color, $color-dark, $color-light);
  font-family: $font-base-family;
  font-size: $font-base-size;
  overflow-y: hidden;
}

// it will translate into this
/* body {
  background: #f3f3f3;
  color: #1d2129;
  font-family: Helvetica;
  font-size: 14px;
  overflow-y: hidden;
} */

a {
  text-decoration: none;
  &:link {
    @include theme(color, $color-primary, $color-tan);
  }
  &:visited {
    color: $color-success;
  }
  &:hover {
    @include theme(color, $color-dark, $color-light);
  }
  &:active {
    color: $color-primary;
  }
}

.chocolate {
  @extend .scoop;
  background: $color-chocolate;
  &:after {
    background: $color-chocolate;
  }
}

// it will translate into this
/* .chocolate,
.scoop {
  width: 100px;
  height: 80px;
  border-radius: 100%;
  position: relative;
  margin-bottom: -45px;
  z-index: 3;
  background: #b98160;
}
&:after{
  content: "";
  position: absolute;
  bottom: 10px;
  left: -10px;
  height: 35px;
  width: 120px;
  border-radius: 100%;
  z-index: 2;
  background: #b98160;
}
&:first-of-type {
    margin-bottom: 0px;
  }
  &:hover {
    transform: scale(1.1);
  }
}
*/

```
