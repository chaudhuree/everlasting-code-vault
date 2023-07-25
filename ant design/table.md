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
      multiple: 2,
    },
  },
  {
    title: "User",
    dataIndex: "user",
    sorter: {
      compare: (a, b) => a.user - b.user, //sort of text
      multiple: 2,
    },
  },
];
```

```js
const data=[
  {
    key: '1',
    purpose: 'Shopping',
    amount: 100,
    user: :"sohan",
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
  pagination={false}
  size="small"
/>
```
