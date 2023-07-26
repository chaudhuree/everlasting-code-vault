> version 4.24.12

```js
import { Table } from "antd";
```

```js
const columns = [
  {
    title: "Purpose",
    dataIndex: "purpose",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: {
      compare: (a, b) => a.amount - b.amount, //sort of number
    },
  },
  {
    title: "User",
    dataIndex: "user",
    sorter: {
      compare: (a, b) => a.user - b.user, //sort of text
    },
    {
      title: "Age",
      dataIndex: "age",
      render: (age, record) => {
        return <span>{record.age}</span>;
        // here (age, record) is destructuring of (record.age, record)
        // that means as dataIndex is "age" so the first argument of render function is "age" and the second argument is "record" object
        // record object contains all the data of the row like, record.purpose, record.amount, record.user, record.age
      },
    }
  },
];
```

```js
const data=[
  {
    purpose: 'Shopping',
    amount: 100,
    user: :"sohan",
    age: 32,
  },
  ...
]
```

```js
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
```

```js
<Table
  columns={columns}
  dataSource={data}
  onChange={onChange}
  pagination={{
    pageSize: 2,
  }}
  size="small"
/>
```
