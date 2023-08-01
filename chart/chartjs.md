## install packages

```js
npm install chart.js
npm install react-chartjs-2
```

#### for example we have data and data is in a file named OrderData.js

```js
const OrderData = [
  { status: "Shipped", count: 4 },
  { status: "Cancelled", count: 3 },
  { status: "Pending", count: 8 },
  { status: "Delivered", count: 12 },
];

export default OrderData;
```

## now we will create component for chart

- BarChart.jsx

```js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return <Bar data={chartData} />;
}

export default BarChart;
```

- LineChart.jsx

```js
  import React from "react";
  import { Line } from "react-chartjs-2";
  import { Chart as ChartJS } from "chart.js/auto";
  
    function LineChart({ chartData }) {
      return <Line data={chartData} />;
    }

  export default LineChart;

```
***
- App.js

```js
import { useState } from "react";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import OrderData from "./data/OrderData";
function App() {
const [orderData, setOrderData] = useState({
  labels: OrderData.map((data) => data.status),
  datasets: [
    {
      label: "Todays Order Status",
      data: OrderData.map((data) => data.count),
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "black",
      borderWidth: 2,
    },
  ],
});

return (
  <>
    <BarChart chartData={orderData} />
    <LineChart chartData={orderData} />
  </>
);
}

export default App;

```
