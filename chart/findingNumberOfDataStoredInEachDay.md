## data stored in each day

// aggregation framework

```js
db.collection.aggregate([
  {
    $project: {
      createdAt: 1,
      yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
    }
  },
  {
    $group: {
      _id: "$yearMonthDay",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])

```

## data stored in last seven days for each day


<!-- without aggregation framework for last seven days -->

```js

// Assuming you have connected to your MongoDB database and have a collection named 'orders'
const currentDate = new Date();
const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

Order.find({ createdAt: { $gte: sevenDaysAgo, $lte: currentDate } })
  .exec()
  .then((dataForLastSevenDays) => {
    const dailyData = {};
    dataForLastSevenDays.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const dateString = createdAt.toISOString().split('T')[0];
      if (!dailyData[dateString]) {
        dailyData[dateString] = 0;
      }
      dailyData[dateString]++;
    });

    console.log(dailyData);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
```
*** 
## format data with a given format
<!-- format the data in a manner -->
```js
[
  {
    id:1,
    date: "2021-09-01",
    order: 2
  }
]
```

```js
const currentDate = new Date();
const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

Order.find({ createdAt: { $gte: sevenDaysAgo, $lte: currentDate } })
  .exec()
  .then((dataForLastSevenDays) => {
    const dailyData = [];
    dataForLastSevenDays.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const dateString = createdAt.toISOString().split('T')[0];
      const existingData = dailyData.find((data) => data.date === dateString);
      if (existingData) {
        existingData.orders++;
      } else {
        dailyData.push({
          id: dailyData.length + 1,
          date: dateString,
          orders: 1,
        });
      }
    });

    console.log(dailyData);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
```

```js
## this will format like this
## [ { count: 8, day: 'Tuesday' } ]
const currentDate = new Date();
const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

const data = await Order.aggregate([
  {
    $match: {
      createdAt: { $gte: sevenDaysAgo, $lte: currentDate }
    }
  },
  {
    $group: {
      _id: { $dayOfWeek: "$createdAt" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      day: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", 1] }, then: "Sunday" },
            { case: { $eq: ["$_id", 2] }, then: "Monday" },
            { case: { $eq: ["$_id", 3] }, then: "Tuesday" },
            { case: { $eq: ["$_id", 4] }, then: "Wednesday" },
            { case: { $eq: ["$_id", 5] }, then: "Thursday" },
            { case: { $eq: ["$_id", 6] }, then: "Friday" },
            { case: { $eq: ["$_id", 7] }, then: "Saturday" },
          ],
          default: "Unknown"
        }
      },
      count: 1
    }
  }
]);


```

***
## data stored in month wise
// how many data stored in each month


```js
const currentDate = new Date();
const twelveMonthsAgo = new Date(currentDate);
twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

Order.aggregate([
  {
    $match: {
      createdAt: { $gte: twelveMonthsAgo, $lte: currentDate }
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      month: {
        $let: {
          vars: {
            monthsInString: [
              "January", "February", "March", "April", "May", "June", 
              "July", "August", "September", "October", "November", "December"
            ]
          },
          in: {
            $arrayElemAt: [
              "$$monthsInString",
              { $subtract: ["$_id.month", 1] }
            ]
          }
        }
      },
      count: 1
    }
  },
  {
    $sort: {
      "_id.month": 1
    }
  }
]);
```

```js
## output will be like this
[
  { month: "January", count: 23 },
  { month: "February", count: 18 },
  // ... and so on for each month in the last 12 months
]
```


***

## data stored in year wise
// how many data stored in each year

```js
// Calculate the date for 5 years ago from the current date
const currentDate = new Date();
const fiveYearsAgo = new Date(currentDate);
fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);

db.collection.aggregate([
  {
    $match: {
      createdAt: { $gte: fiveYearsAgo, $lte: currentDate }
    }
  },
  {
    $group: {
      _id: { $year: "$createdAt" },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      year: "$_id",
      orders: "$count"
    }
  },
  {
    $sort: {
      year: 1
    }
  }
]);

```

```js
## output
[ { year: 2023, orders: 8 } ]
```

***

## filter data by status(pending,cancelled....) for current month

```js
// Calculate the start and end date for the current month
const currentDate = new Date();
const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

const data= await Order.aggregate([
  {
    $match: {
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    }
  },
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      status: "$_id",
      count: 1
    }
  },
  {
    $facet: {
      data: [
        { $match: { status: { $in: ["Shipped", "Cancelled", "Pending", "Delivered"] } },}
      ],
      statuses: [
        { $group: { _id: "$status" } },
        { $project: { _id: 0, status: "$_id" } },
        { $match: { status: { $nin: ["Shipped", "Cancelled", "Pending", "Delivered"] } } }
      ]
    }
  },
  {
    $project: {
      status: { $concatArrays: ["$statuses", "$data"] }
    }
  },
  {
    $unwind: "$status"
  },
  {
    $replaceRoot: { newRoot: "$status" }
  }
]);

console.log('data', data);


```

```js
## output
[
  { status: "Shipped", count: 1 },
  { status: "Cancelled", count: 1 },
  { status: "Pending", count: 1 },
  { status: "Delivered", count: 1 }
]
```

## get order status for current days

```js
const currentDate = new Date();
  const startOfDay = new Date(currentDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(currentDate);
  endOfDay.setHours(23, 59, 59, 999);

  const data = await Order.aggregate([
    {
      $match: {
        $or: [
          { createdAt: { $gte: startOfDay, $lte: endOfDay } },
          { updatedAt: { $gte: startOfDay, $lte: endOfDay } },
        ],
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);
```
