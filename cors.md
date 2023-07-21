## ERR_BLOCKED_BY_RESPONSE.NotSameOrigin CORS Policy JavaScript


solution:

```js
*in the server add this code:*
helmet({
      crossOriginResourcePolicy: false,
    })
```

## cors anywhere
- go to below website first:
 - https://cors-anywhere.herokuapp.com

- then while calling api use like this
 - https://cors-anywhere.herokuapp.com/https://api.weatherapi.com/v1/current.json?key=${this.apiKey}&q=${city},${country}