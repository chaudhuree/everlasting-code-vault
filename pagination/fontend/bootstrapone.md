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
    setActivePage(1); // Reset the activePage state to 1 whenever totalPages changes
  }, [totalPages]);
  
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
  .pagination-lg {
  --bs-pagination-padding-x: 1.5rem;
  --bs-pagination-padding-y: 0.75rem;
  --bs-pagination-font-size: 1.25rem;
  --bs-pagination-border-radius: var(--bs-border-radius-lg);
}
.pagination-sm {
  --bs-pagination-padding-x: 0.5rem;
  --bs-pagination-padding-y: 0.25rem;
  --bs-pagination-font-size: 0.875rem;
  --bs-pagination-border-radius: var(--bs-border-radius-sm);
}
.app-pagination .pagination {
  font-size: 0.875rem;
}
.app-pagination .pagination .page-link {
  color: #5d6778;
  padding: 0.25rem 0.5rem;
}
.app-pagination .pagination .page-item.active .page-link {
  background: #747f94;
  color: #fff;
  border-color: #747f94;
}
.app-pagination .pagination .page-item.disabled .page-link {
  color: #9fa7b5;
}
.page-link {
  position: relative;
  display: block;
  padding: var(--bs-pagination-padding-y) var(--bs-pagination-padding-x);
  font-size: var(--bs-pagination-font-size);
  color: var(--bs-pagination-color);
  text-decoration: none;
  background-color: var(--bs-pagination-bg);
  border: var(--bs-pagination-border-width) solid
    var(--bs-pagination-border-color);
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .page-link {
    transition: none;
  }
}
.page-link:hover {
  z-index: 2;
  color: var(--bs-pagination-hover-color);
  background-color: var(--bs-pagination-hover-bg);
  border-color: var(--bs-pagination-hover-border-color);
}
.page-link:focus {
  z-index: 3;
  color: var(--bs-pagination-focus-color);
  background-color: var(--bs-pagination-focus-bg);
  outline: 0;
  box-shadow: var(--bs-pagination-focus-box-shadow);
}
.page-link.active,
.active > .page-link {
  z-index: 3;
  color: var(--bs-pagination-active-color);
  background-color: var(--bs-pagination-active-bg);
  border-color: var(--bs-pagination-active-border-color);
}
.page-link.disabled,
.disabled > .page-link {
  color: var(--bs-pagination-disabled-color);
  pointer-events: none;
  background-color: var(--bs-pagination-disabled-bg);
  border-color: var(--bs-pagination-disabled-border-color);
}
.page-item:not(:first-child) .page-link {
  margin-left: calc(var(--bs-border-width) * -1);
}
.page-item:first-child .page-link {
  border-top-left-radius: var(--bs-pagination-border-radius);
  border-bottom-left-radius: var(--bs-pagination-border-radius);
}
.page-item:last-child .page-link {
  border-top-right-radius: var(--bs-pagination-border-radius);
  border-bottom-right-radius: var(--bs-pagination-border-radius);
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