- install react paginate

```js
npm install react-paginate@8.1.4 --save
```

- in pagination related page codes

```js
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const PaginatedData=()=>{

  const [pageNo, setpageNo] = useState(1);
  const [perPage, setPerPage] = useState(5)
  const [Total, setTotal] = useState(0)
    // pagination
  const handlePageClick = (e) => {
    setpageNo(e.selected + 1)
  };

  useEffect(() => {
    // do api calling related things and set Total
    // here Total is the total number of data
  }, []);

    return(

      {/* pagination */}
      <div className="mx-auto">
        {Total && <ReactPaginate
          pageClassName="page-item"
          pageLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          marginPagesDisplayed={2}
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(Number(Total / perPage))}
          previousLabel="< "

        />}
      </div>
    )
  
}
```