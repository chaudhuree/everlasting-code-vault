- package to be installed in fontend

```js
 npm install react-to-print
```

## usage

```js
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const BillsPage = () => {
  const componentRef = useRef();
  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div>
      {/* we can show this data, mean componentRef related data in a modal and from that modal it can be printed using the print button.
      all we need to do , just wrap the componentRef related whole div into a <Modal>
        <div ref={componentRef}>
            data to be printed
        </div>
        </Modal> */}
      <div id="invoice-POS" ref={componentRef}>
        <center id="top">
          <div className="info">
            <h2>ECOM Hub</h2>
            <p> Contact : +8801736873879 | Uttara, Sector-1</p>
          </div>
          {/*End Info*/}
        </center>
        {/*End InvoiceTop*/}
        <div id="mid">
          <div className="mt-2">
            <p>
              Customer Name : <b>{selectedBill.customerName}</b>
              <br />
              Phone No : <b>{selectedBill.customerNumber}</b>
              <br />
              Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
              <br />
            </p>
            <hr style={{ margin: "5px" }} />
          </div>
        </div>
        {/*End Invoice Mid*/}
        <div id="bot">
          <div id="table">
            <table>
              <tbody>
                <tr className="tabletitle">
                  <td className="item">
                    <h2>Item</h2>
                  </td>
                  <td className="Hours">
                    <h2>Qty</h2>
                  </td>
                  <td className="Rate">
                    <h2>Price</h2>
                  </td>
                  <td className="Rate">
                    <h2>Total</h2>
                  </td>
                </tr>
                {selectedBill.cartItems.map((item) => (
                  <>
                    <tr className="service">
                      <td className="tableitem">
                        <p className="itemtext">{item.name}</p>
                      </td>
                      <td className="tableitem">
                        <p className="itemtext">{item.quantity}</p>
                      </td>
                      <td className="tableitem">
                        <p className="itemtext">{item.price}</p>
                      </td>
                      <td className="tableitem">
                        <p className="itemtext">{item.quantity * item.price}</p>
                      </td>
                    </tr>
                  </>
                ))}

                <tr className="tabletitle">
                  <td />
                  <td />
                  <td className="Rate">
                    <h2>tax</h2>
                  </td>
                  <td className="payment">
                    <h2>{selectedBill.tax} tk</h2>
                  </td>
                </tr>
                <tr className="tabletitle">
                  <td />
                  <td />
                  <td className="Rate">
                    <h2>Grand Total</h2>
                  </td>
                  <td className="payment">
                    <h2>
                      <b>{selectedBill.totalAmount} tk</b>
                    </h2>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/*End Table*/}
          <div id="legalcopy">
            <p className="legal">
              <strong>Thank you for your order!</strong>
              For any assistance please write email
              <b> chaudhuree@gmail.com</b>
            </p>
          </div>
        </div>
        {/*End InvoiceBot*/}
      </div>
      {/*End Invoice*/}
      <div className="d-flex justify-content-end mt-3">
        <Button type="primary" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </div>
  );
};
```

## invoice css

```css
#invoice-POS {
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 4mm;
  margin: 0 auto;
  width: 76mm;
  background: #fff;
}

::selection {
  background: #f31544;
  color: #fff;
}
::moz-selection {
  background: #f31544;
  color: #fff;
}
h1 {
  font-size: 1.5em;
  color: #222;
}
h2 {
  font-size: 0.9em;
}
h3 {
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}
p {
  font-size: 0.7em;
  color: #666;
  line-height: 1.2em;
}

#top,
#mid,
#bot {
  /* Targets all id with 'col-' */
  border-bottom: 1px solid #eee;
}

#top {
  min-height: 60px;
}

#bot {
  min-height: 50px;
}

#top .logo {
  /* //float: left; */
  height: 60px;
  width: 60px;
  border-radius: 20%;
  background: url(https://yt3.ggpht.com/ytc/AKedOLRB0XGxEABopk8qJ2-CcnA0UoVyC7TarDi5PJwGIQ=s176-c-k-c0x00ffffff-no-rj-mo)
    no-repeat;
  background-size: 50px 50px;
}
.clientlogo {
  float: left;
  height: 60px;
  width: 60px;
  background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
  background-size: 60px 60px;
  border-radius: 50px;
}
.info {
  display: block;
  /* //float:left; */
  margin-left: 0;
}
.title {
  float: right;
}
.title p {
  text-align: right;
}
table {
  width: 100%;
  border-collapse: collapse;
}
/* td {
    //padding: 5px 0 5px 15px;
    //border: 1px solid #EEE
  } */
.tabletitle {
  /* //padding: 5px; */
  font-size: 0.5em;
  background: #eee;
}
.service {
  border-bottom: 1px solid #eee;
}
.item {
  width: 24mm;
}
.itemtext {
  font-size: 0.5em;
}

#legalcopy {
  margin-top: 5mm;
}
```
