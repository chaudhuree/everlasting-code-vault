## go to sendgrid.com and create an account

## create a new API key

- in the backend install the sendgrid package

```
@sendgrid/mail
```

- store the api key safely in .env file

```js
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);
```

- mail sending

```js
// // prepare email
const emailData = {
  from: process.env.EMAIL_FROM, // try to use the email that is used to create the sendgrid account
  to: order.buyer.email,
  subject: "Order status",
  html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
};

sgMail.send(emailData);
```
