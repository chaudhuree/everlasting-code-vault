# procedure


what is going on here
1. backend a env file a braintree key gula store kora hoice
2. fontend er jonne token lagbe so oijonne backend a token generate korar jonno ekta controller and router crete kora hoice. controller er name getToken
3. fontend a necessary package install kore cart jokhn select sesh hobe tokhn cart page a nea jawa hobe.
4. oikhane prothome useEffect er maddhome backend a hit kore token ta nea newa hobe.
5. then kicu validation er por payment er button dekhane hobe. then payment a click korle oikhane generated nonce, and cart ta backend a pathabo.
6. we are sending full cart to backend
7. we are calculating total price
8. we are sending total price and nonce to braintree
9. if payment is successful then we are creating order
10. we are decrementing quantity


- packages for braintree payment
```js
// backend 
braintree
// frontend
braintree-web-drop-in-react
```
- create accont and collect keys and store in .env file in backend

```js
BRAINTREE_MERCHANT_ID,
BRAINTREE_PUBLIC_KEY,
BRAINTREE_PRIVATE_KEY,

```

- model for storing order details and payment info

```js
const orderSchema = new Schema(
  {
    products: [{ type: ObjectId, ref: "Product" }], // card theke j j product er payment kora hoice oigulo add hobe.
    payment: {}, // payment korar por ja data pabo sob aikhane save hobe
    buyer: { type: ObjectId, ref: "User" }, // req.user theke id pabo
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true, versionKey: false }
);
```

- order related controller a ai data ta akdom top a add kore dite hobe.

```js
const Order = require("../models/order.js");
// saving the order datails and payment info
const Product = require("../models/product.js");
// for decrementing quantity and incrementing sold 
const braintree = require("braintree");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});
```

- token generate korar jonno ai function ta use korte hobe.

```js
// docs: braintree generate token 
exports.getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
```
> aitar pore fonend er code run hobe. fontend theke nonce and cart ta backend a ashbe . then ai controller run hobe.

- order processing related code

```js

exports.processPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { nonce, cart } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    // console.log("total => ", total);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // res.send(result);
          // create order
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          // decrement quantity
          decrementQuantity(cart);

          res.json({ success: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const decrementQuantity = async (cart) => {
  try {
    // build mongodb query
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -0, sold: +1 } },
        },
      };
    });

    const updated = await Product.bulkWrite(bulkOps, {});
    console.log("blk updated", updated);
  } catch (err) {
    console.log(err);
  }
};
```

- order status change and sending mail related code

```js
exports.orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email name");
    // send email

    // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: order.buyer.email,
      subject: "Order status",
      html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
    };

    try {
      await sgMail.send(emailData);
    } catch (err) {
      console.log(err);
    }

    res.json(order);
  } catch (err) {
    console.log(err);
  }
};
```

- routes

```js
router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);
```


## client side

> ## cart page.

```js
import DropIn from 'braintree-web-drop-in-react';
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
    // braintree getTOken
  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

   const handleBuy = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      //   console.log("nonce => ", nonce);
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
        // console.log("handle buy response => ", data);
      if (data.success) {
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Payment successful");
      }
   
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

// payment related card ta show korar jonne
   <div className="mt-3">
        {!clientToken || !cart?.length ? (
          ""
        ) : (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              onClick={handleBuy}
              className="btn btn-primary col-12 mt-2"
              disabled={!auth?.user?.address || !instance || loading}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
          </>
        )}
      </div>
```