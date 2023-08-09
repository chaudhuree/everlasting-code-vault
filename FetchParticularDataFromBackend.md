```js
const user={
  name: 'chaudhuree',
  age: 30,
  email: 'chaudhuree@gmail.com',
  password: '123456'
}
```

```js
// way one

delete user.password;
res.send(user);
```

```js
// way two

const {password, ...data} = user;
res.send(data);
```

