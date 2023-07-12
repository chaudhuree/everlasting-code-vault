#### previous way to select DOM elements
```js
<h1 id="hid">headline</h1>
const myH1 = document.getElementById('hid');
```

#### useRef way to select DOM elements

```js
const selectH1 = useRef();
const selectH2 = useRef();
const imageRef = useRef();
// selectH1.current is the DOM element
// selectH1.current.value is the value of the DOM element
// selectH1.current.inerText is the innerText of the DOM element
// selectH1.current.innerHTML is the innerHTML of the DOM element

// selectH1.current.innerText = 'new headline';
// selectH2.innerText = 'new headline'; // now current is not needed


/*----------------------
      select DOM elements
------------------------*/

<h1 ref={selectH1}>headline one</h1>
// or
<h1 ref={(element)=>selectH2=element}>headline two</h1>

/*----------------------
      useRef Attribute
------------------------*/
<img src="dummy.jpg" alt="no image" ref={imageRef}/>

imageRef.current.src = 'changedImage.jpg';
imageRef.current.alt = 'changed alt text';
imageRef.current.setAttribute("width", "100px");

/*----------------------
      useRef class
------------------------*/

selectH2.classList.add('newClass');
selectH2.classList.remove('newClass');

```