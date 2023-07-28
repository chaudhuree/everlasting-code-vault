- install aos

```jsx
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

export default function App() {
  return (
    <div className="App">
      <div style={{width:"180px",height:"180px", background:"#202746",color:"#979db4",display:"grid",placeItems:"center",border:"8px solid #ffc619"}}>
        <pre>
          <code>
          <div data-aos="zoom-in-up" data-aos-duration='10000' style={{padding:"0 10px"}}>
          npm install  aos@2.3.4
          </div>
          </code>
        </pre>
      </div>
    </div>
  );
}
```