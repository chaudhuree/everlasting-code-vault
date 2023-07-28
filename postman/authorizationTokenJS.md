- in the main window this time only set the baseUrl in the variables tab.

//set token dynamically

> in login and registration route it should give back the token in a token field.

-> in login,registration route in postman go to Test tab and write below code:

```
 const jsonData=pm.response.json();
 pm.globals.set("token",jsonData.token);
```

-> and then press on send button.

▶ ▶ by this way token will be set dynamically and you can use it in other routes.

-> now we will go to any route which is protected.and need token:

:: for example: getAllJobs route,

-> we will go to Authorization tab and select Bearer Token,
and in the box below write: {{token}} and press on send button.

==> done. by this way we can easily set token dynamically and use it in other routes.

```js
// backend code

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization; //in header.authorization we will get token
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    //token will be like, Bearer tokenCode so we use startsWith
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  // after getting the token it wil be like, Bearer tokenCode so we will split it and get tokenCode from the second index of the array which is 1

  try {
    //verify the token and get the payload which is the user id and name
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }; //docs: set req.user so that we can use it in the routes and get the user id and name
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
```

```js
//  client side code

{
    headers: {
      authorization: `Bearer ${TOKEN}`,
    },
  };
```
