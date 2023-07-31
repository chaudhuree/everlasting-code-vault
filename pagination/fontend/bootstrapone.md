- first create a pagination component

> Pagination.jsx
```js
import React, { useState, useEffect } from 'react';

const Pagination = ({setActivePageNo,totalPages }) => {
 
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (page) => {
    setActivePage(page);
    setActivePageNo(page);
  };

  useEffect(() => {
    console.log('Active Page:', activePage);
  }, [activePage]);

  const renderPageLinks = () => {
    const links = [];
    for (let page = 1; page <= totalPages; page++) {
      links.push(
        <li
          key={page}
          className={`page-item ${activePage === page ? 'active' : ''}`}
        >
          <p
            className="page-link"
           
            onClick={() => handlePageClick(page)}
          >
            {page}
          </p>
        </li>
      );
    }
    return links;
  };

  return (
    <nav className="app-pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${activePage === 1 ? 'disabled' : ''}`}>
          <p
            className="page-link"
            tabIndex="-1"
            aria-disabled="true"
            onClick={() => handlePageClick(activePage - 1)}
          >
            Previous
          </p>
        </li>
        {renderPageLinks()}
        <li
          className={`page-item ${activePage === totalPages ? 'disabled' : ''}`}
        >
          <p
            className="page-link"
            onClick={() => handlePageClick(activePage + 1)}
          >
            Next
          </p>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

```

> dummy css use them or create your own
```css
.app-pagination{}
.pagination {
    --bs-pagination-padding-x: 0.75rem;
    --bs-pagination-padding-y: 0.375rem;
    --bs-pagination-font-size: 1rem;
    --bs-pagination-color: var(--bs-link-color);
    --bs-pagination-bg: var(--bs-body-bg);
    --bs-pagination-border-width: var(--bs-border-width);
    --bs-pagination-border-color: var(--bs-border-color);
    --bs-pagination-border-radius: var(--bs-border-radius);
    --bs-pagination-hover-color: var(--bs-link-hover-color);
    --bs-pagination-hover-bg: var(--bs-tertiary-bg);
    --bs-pagination-hover-border-color: var(--bs-border-color);
    --bs-pagination-focus-color: var(--bs-link-hover-color);
    --bs-pagination-focus-bg: var(--bs-secondary-bg);
    --bs-pagination-focus-box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    --bs-pagination-active-color: #fff;
    --bs-pagination-active-bg: #0d6efd;
    --bs-pagination-active-border-color: #0d6efd;
    --bs-pagination-disabled-color: var(--bs-secondary-color);
    --bs-pagination-disabled-bg: var(--bs-secondary-bg);
    --bs-pagination-disabled-border-color: var(--bs-border-color);
    display: flex;
    padding-left: 0;
    list-style: none;
}
.app-pagination .pagination {
    font-size: .875rem;
}
.app-pagination .pagination .page-item.active .page-link {
    background: #747f94;
    color: #fff;
    border-color: #747f94;
}
.app-pagination .pagination .page-link {
    color: #5d6778;
    padding: .25rem .5rem;
}
```

***

## usage

> ParentComponent.jsx
```js
import React, { useState } from 'react';
import Pagination from './Pagination';

const ParentComponent = () => {
  const [activePageNo, setActivePageNo] = useState(1);
  const totalPages = 5; 

  useEffect(() => {
    // do api calling related things with activePageNo
  }, [activePageNo]);


  return (
    <div>
     
      <Pagination
        totalPages={totalPages}
        setActivePageNo={setActivePageNo}
      />
    </div>
  );
};

export default ParentComponent;

```