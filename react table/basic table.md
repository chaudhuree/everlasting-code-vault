## install react table

```bash
npm install react-table
```

## use case of basic table

- get the data you want to display
- define the columns for the table
- use the data and columns defined to create a table instance using react-table
- define a basic table structure using plain html
- use the table instance created in step 3 to bring life to the html defined in step 4
- include the desired css to style the table


## sample data

```js
[
  {
    "id": 1,
    "first_name": "Torie",
    "last_name": "Rustman",
    "email": "trustman0@amazon.co.uk",
    "date_of_birth": "1979-11-16T23:04:32Z",
    "age": 45,
    "country": "Argentina",
    "phone": "6844103517"
  },
  ...
]
```

## sample columns

```js
[
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'First Name',
    accessor: 'first_name'
  },
  {
    Header: 'Last Name',
    accessor: 'last_name'
  },
  {
    Header: 'Date of Birth',
    accessor: 'date_of_birth'
  },
  {
    Header: 'Age',
    accessor: 'age'
  },
  {
    Header: 'Phone',
    accessor: 'phone'
  }
]
```

> step 1: get the data you want to display

```js
import MOCK_DATA from '../assets/MOCK_DATA.json'
```

> step 2: define the columns for the table

```js
import COLUMNS from '../assets/columns'
```

> step 3: use the data and columns defined to create a table instance using react-table

```js
const tableInstance = useTable({
  columns: COLUMNS,
  data: MOCK_DATA
})

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  }
```

> step 4: define a basic table structure using plain html

```html
<table>
  <thead>
    <tr>
      <th>Id</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
    </tr>
  </tbody> 
</table>
```

> step 5: use the table instance created in step 3 to bring life to the html defined in step 4

```html
<table {...getTableProps()}>
  <thead>
    {
      headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {
            headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))
          }
        </tr>
      ))
    }
  </thead>
  <tbody {...getTableBodyProps()}>
    {
      rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
        )
      })
    }
  </tbody>
  <tfoot>
    {
      footerGroups.map(footerGroup => (
        <tr {...footerGroup.getFooterGroupProps()}>
          {
            footerGroup.headers.map(column => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))
          }
        </tr>
      ))
    }
  </tfoot>
</table>
```

</br>
</br>

*** 

</br>
</br>

## footer

> code is similr to header so it is already added but need some change in column. so the new updated column is below

```js
export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country",
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age",
  },
];
```

## sorting a table

- first import useSortBy from react-table
- edit this line

```js
column.getHeaderProps(column.getSortByToggleProps())
```
- add below code for sorting icon

```js
  <span>
      {column.isSorted
        ? column.isSortedDesc
        ? ' 🔽'
        : ' 🔼'
        : ''}
   </span>
```

## global filtering

- first import useGlobalFilter from react-table
- pass this in the useTable hook

```js
const { 

  state,
  setGlobalFilter
} = useTable({
  columns: COLUMNS,
  data: MOCK_DATA
}, useGlobalFilter)
```
- will get state and setGlobalFilter from useTable hook
- add below code for global filter

- destructuring  globalFilter from state

```js
const { 
  globalFilter
} = state
```

- create a component for global filter

```js
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      Search: {' '}
      <input value={filter || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}
```

- add this component in the table

```js
<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
---
basic table..
```


## column filtering

- create a column filtering component

```js
import React from 'react'

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column
  return (
    <span>
      Search:{' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
      />
    </span>
  )
}

```

- add this component in the table column in each one

```js
{
  Header: 'First Name',
  accessor: 'first_name',
  Filter: ColumnFilter
},
```

- import useFilters from react-table
- pass this in the useTable hook

```js
import { useTable,useGlobalFilter, useFilters } from 'react-table'
const { 

  state,
  setGlobalFilter
} = useTable({
  columns: COLUMNS,
  data: MOCK_DATA
}, useFilters, useGlobalFilter)
```

- attach this code in th in the table header

```js
<th {...column.getHeaderProps(column.getSortByToggleProps())}>
  {column.render('Header')}
  <div>{column.canFilter ? column.render('Filter') : null}</div>
</th>
```