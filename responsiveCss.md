```css
/* XL Device :1200px. */
@media (min-width: 1200px) and (max-width: 1500px) {


}



/* LG Device :992px. */
@media (min-width: 992px) and (max-width: 1200px) {
  
  
  }

 
/* MD Device :768px. */
@media (min-width: 768px) and (max-width: 991px) {
  
  
  }

 
/* Extra small Device. */
@media (max-width: 767px) {
  
  
  }
 
/* SM Small Device :550px. */
@media only screen and (min-width: 576px) and (max-width: 767px) {
  
  }


/* retina query */
@media only screen and (-webkit-min-device-pixel-ratio:2) and (max-width:991.98px),only screen and (min--moz-device-pixel-ratio:2) and (max-width:991.98px),only screen and (-o-min-device-pixel-ratio:2/1) and (max-width:991.98px),only screen and (min-device-pixel-ratio:2) and (max-width:991.98px),only screen and (min-resolution:192dpi) and (max-width:991.98px),only screen and (min-resolution:2dppx) and (max-width:991.98px){

  .logo .standard-logo{
    display: none;
}
.logo .retina-logo{
  display: inline-block;
}

}


@media only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min--moz-device-pixel-ratio:2),only screen and (-o-min-device-pixel-ratio:2/1),only screen and (min-device-pixel-ratio:2),only screen and (min-resolution:192dpi),only screen and (min-resolution:2dppx){
  .logo .standard-logo{
    display: none;
}
.logo .retina-logo{
  display: inline-block;
}

}
```

```css
@media (min-width: 1200px) and (max-width: 1500px) {

}
  /* media query with comparison operator */
  @media (1200px <= width <= 1500px) {
    /* etc. */
  }
```

```css
  @media (min-width: 600px) {
  .element {
    /* Style away! */
  }
}

@media (width >= 600px) {
  .element {
    /* Style away! */
  }
}
```