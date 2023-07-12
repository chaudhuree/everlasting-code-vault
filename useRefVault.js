/*----------------------
      select DOM elements
------------------------*/

//previous way to select DOM elements
<h1 id="hid">headline</h1>
const myH1 = document.getElementById('hid');

// useRef way to select DOM elements
const selectH1 = useRef();
const selectH2 = useRef();
// selectH1.current is the DOM element
// selectH1.current.value is the value of the DOM element
// selectH1.current.inerText is the innerText of the DOM element
// selectH1.current.innerHTML is the innerHTML of the DOM element

// selectH1.current.innerText = 'new headline';
// selectH2.innerText = 'new headline'; // now current is not needed
<>
<h1 ref={selectH1}>headline one</h1>
// or
<h1 ref={(element)=>selectH2=element}>headline two</h1>
</>