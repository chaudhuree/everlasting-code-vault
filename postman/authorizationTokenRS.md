- in the main window click on the variable tab
- with baseUrl set a field for token and store token in it.
- stay in the window and click on the authorization tab
>- set here.
    - Type : API key
    - below this option
        - key : token
        - value : {{ token}}
        - Add to: header

- now for postman testing.
- when register or login you will get a token. and copy this token and save it in tha main window variables tab, token field.
- this way this token will be available for every route.

## now in coding backend middleware part

```js
let Token=req.headers['token'];
    jwt.verify(Token,"SecretKey123456789",function (err,decoded) {
        if(err){
            console.log(Token)
            res.status(401).json({status:"unauthorized"})
        }
        else {
            let email=decoded['data'];
            console.log(email)
            req.headers.email=email
            next();
        }
```

## client side part

```js
axios.get(http://localhost:5000/updateProfile,{
    headers:{"token":Token}
})
```