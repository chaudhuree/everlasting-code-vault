**how to create custom mock data**

> > go to <a src="https://www.mockaroo.com/">Mockaroo</a>

_follow below image to generate custom mock data_

![custom mock data](/assets/mockaroo.png "Shiprock, New Mexico by Beau Rogers")

**creating json server with this data**

---

- install json-server

```bash
npm install -g json-server
```

- run server with data , which is named as db.json

```bash
npx json-server --watch db.json --port 3000
```

<hr>

creating json server with multiple datasets

```js
{
  "dataset1": [
    {
      "id": 1,
      "name": "Pankaj",
      "salary": "10000"
    },
    {
      "id": 2,
      "name": "David",
      "salary": "5000"
    }
  ],
  "dataset2": [
    {
      "id": 3,
      "name": "Lisa",
      "salary": "2000"
    },
    {
      "id": 4,
      "name": "John",
      "salary": "8000"
    }
  ]
}
```
