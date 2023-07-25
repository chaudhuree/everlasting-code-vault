```js
import { DatePicker } from "antd";

const handleDateChange = (date, dateString) => {
  console.log(date);
  console.log(dateString);
};

<DatePicker size="large" onChange={handleDateChange} />;
```
