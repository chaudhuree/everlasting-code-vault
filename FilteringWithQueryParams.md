## Fontend

***

> FilterOption.css
```css
.form-check {
  position: relative !important;
  align-items: center !important;
  display: flex !important;
  padding-left: 3.25rem !important;
}
```
> FilterOption.jsx
```jsx
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./FilterOption.css";

const FilterOption = ({
  selectedCategory,
  setSelectedCategory,
  selectedPublication,
  setSelectedPublication,
  selectedAuthor,
  setSelectedAuthor,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/categories"
        );
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch authors from the API
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/writers"
        );
        const data = response.data;
        setAuthors(data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    // Fetch publications from the API
    const fetchPublications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/publications"
        );
        const data = response.data;
        setPublications(data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    // Fetch data
    fetchCategories();
    fetchAuthors();
    fetchPublications();
  }, []);
  return (
    <Fragment>
      {/* Category */}
      <div className="widget widget-collapsible">
        <p>
          <a
            className=""
            data-bs-toggle="collapse"
            href="#collapseExample"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <h3 className="widget-title">Category</h3>
          </a>
        </p>
        <div className="collapse" id="collapseExample">
          <div className="collapse show" id="widget-1">
            <div className="widget-body">
              {/* Categories */}
              {categories.map((category) => (
                <div className="form-check" key={category._id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.name}
                    id={category._id}
                    onChange={() => setSelectedCategory(category.name)}
                  />
                  <label className="form-check-label" htmlFor={category._id}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="widget widget-collapsible">
        <p>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample2"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <h3 className="widget-title">Publication</h3>
          </a>
        </p>
        <div className="collapse" id="collapseExample2">
          <div className="collapse show" id="widget-1">
            <div className="widget-body">
              {/* Publications */}
              {publications.map((publication) => (
                <div className="form-check" key={publication._id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={publication._id}
                    checked={selectedPublication === publication.name}
                    name="publication"
                    onChange={() => setSelectedPublication(publication.name)}
                  />
                  <label className="form-check-label" htmlFor={publication._id}>
                    {publication.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Publication */}

      {/* Price Range */}
      <div className="widget">
        <h3 className="widget-title">Price Range</h3>
        <div className="widget-body">
          <div className="filter-items">
            <div className="filter-item">
              <label htmlFor="min-price">Min Price:</label>
              <input
                type="number"
                id="min-price"
                className="form-control"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="max-price">Max Price:</label>
              <input
                type="number"
                id="max-price"
                className="form-control"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Author */}

      <div>
        <p>
          <a
            data-bs-toggle="collapse"
            href="#collapseExample3"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <h3 className="widget-title">Author</h3>
          </a>
        </p>
        <div className="collapse" id="collapseExample3">
          <div className="collapse show" id="widget-1">
            <div className="widget-body">
              {/* Authors */}
              {authors.map((author) => (
                <div className="form-check" key={author._id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={author._id}
                    checked={selectedAuthor === author.name}
                    name="author"
                    onChange={() => setSelectedAuthor(author.name)}
                  />
                  <label className="form-check-label" htmlFor={author._id}>
                    {author.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterOption;

```

> FilterPanel.jsx

```jsx
import React, { Fragment } from 'react'
import FilterOption from './FilterOption'

const FilterPanel = () => {
    return (
        <Fragment>
           
            <FilterOption />
        </Fragment>
    )
}

export default FilterPanel

```


> ProductPanel.css
```css
.button-load {
  color: white;
  background-color: #15a362;
  font-weight: 500;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  line-height: 2.5rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-align: center;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  border: none;
  box-shadow: none !important;
}

.button-load:hover {
  background-color: #0f6c41;
}

.button-load svg {
  display: inline;
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.75rem;
  color: white;
}

/* .button-load:focus svg {
  animation: spin_357 0.5s linear ;
} */
.button-load.loading svg {
  animation: spin_357 0.5s linear;
}

@keyframes spin_357 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


```

> ProductPanel.jsx

```jsx
import React, { Fragment, useEffect, useState } from "react";
import {RxCross2} from "react-icons/rx";
import axios from "axios";
import BookCard from "../../../components/category/BookCard";
import "./ProductPanel.css";
const ProductPanel = ({
  selectedCategory,
  selectedPublication,
  selectedAuthor,
  minPrice,
  maxPrice,
  sort,
  setSort,
}) => {
  const [books, setBooks] = useState([]);
  let [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  let [total, setTotal] = useState(0);
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPerPage((prev) => prev + 4);
    }, 1000);
  };

  useEffect(() => {
    // Fetch the filtered books from the API
    const fetchFilteredBooks = async () => {
      try {
        // Construct the query params based on selected filter criteria
        const queryParams = new URLSearchParams();
        if (selectedCategory) {
          queryParams.append("categories", selectedCategory);
        }
        if (selectedPublication) {
          queryParams.append("publications", selectedPublication);
        }
        if (selectedAuthor) {
          queryParams.append("authors", selectedAuthor);
        }
        if (minPrice) {
          queryParams.append("minPrice", minPrice);
        }
        if (maxPrice) {
          queryParams.append("maxPrice", maxPrice);
        }
        if(sort){
          queryParams.append("sort", sort);
        }
        if(perPage){
          queryParams.append("perPage", perPage);
        }

        // Fetch filtered books
        const response = await axios.get(
          `http://localhost:5000/api/v1/filter?${queryParams}`
        );
        // const response = await axios.get(`http://localhost:5000/api/v1/filter?authors=kazi%20nazrul%20islam`);
        const data = response.data;
        console.log(`http://localhost:5000/api/v1/filter?${queryParams}`);
        // console.log(`response = ${JSON.stringify(data)}`)
        setBooks(data.filteredBooks); // Set the fetched data directly to the books state
        setTotal(data.total)
      } catch (error) {
        console.error("Error fetching filtered books:", error);
      }
    };

    fetchFilteredBooks();
  }, [
    selectedCategory,
    selectedPublication,
    selectedAuthor,
    minPrice,
    maxPrice,
    sort,
    perPage
  ]);
const handleClearFilter = () => {
  window.location.reload();
}
  return (
    <Fragment>
      <div className="toolbox">
        <div className="toolbox-left">Number of results: {books.length} 
        <span className="mx-4" style={{cursor:"pointer"}}><a onClick={handleClearFilter} className="mx-4"><RxCross2 style={{color:"red",fontSize:"18px",marginRight:"4px"}}/>Clear Filter</a></span>
        </div>
        <div className="toolbox-right">
          <div className="toolbox-sort">
            <label htmlFor="sortby">Sort by:</label>
            <div className="select-custom">
              <select name="sortby" id="sortby" className="form-control" onChange={(e)=>setSort(e.target.value)}>
                <option value="" selected="selected" disabled>
                  Select One
                </option>
                <option value="atoz">A to Z</option>
                <option value="ztoa">Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="row py-4 my-4">
        {books.length > 0 && <h1 className="my-5">Filtered Books</h1>}
        {books.length > 0
          ? books.map((book) => (
              <div className="col-6 col-md-4 my-4">
                <BookCard book={book} category={book?.category} />
              </div>
            ))
          : ""}
      </div>

      <div className="row">
                <div className="col load-more text-center">
                  {total === books.length ? (
                    ""
                  ) : (
                    <button
                      className={`button-load mt-4 ${loading ? "loading" : ""}`}
                      type="button"
                      onClick={handleLoadMore}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="bi bi-arrow-repeat"
                        fill="currentColor"
                        height={16}
                        width={16}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                        <path
                          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                          fillRule="evenodd"
                        />
                      </svg>
                      Load More
                    </button>
                  )}
                </div>
              </div>
    </Fragment>
  );
};

export default ProductPanel;
```

> ## ShopPage.jsx
  
  ```jsx
import React, { Fragment, useState } from "react";
import FilterPanel from "./FilterOption.jsx";
import ProductPanel from "./ProductPanel";

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
 
  return (
    <Fragment>
      <div className="page-content mt-4">
        <div className="container">
          <div className="row">
            <aside className="col-lg-3 col-4 order-lg-first">
              <FilterPanel
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedPublication={selectedPublication}
                setSelectedPublication={setSelectedPublication}
                selectedAuthor={selectedAuthor}
                setSelectedAuthor={setSelectedAuthor}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </aside>
            <div className="col-lg-9 col-8">
              <ProductPanel
                selectedCategory={selectedCategory}
                selectedPublication={selectedPublication}
                selectedAuthor={selectedAuthor}
                minPrice={minPrice}
                maxPrice={maxPrice}
                sort={sort}
                setSort={setSort}
              />
              
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShopPage;

  ```

  - Finally import this ShopPage in App.jsx and render them with proper route.


  ## Backend

  > controller

```js
exports.filterBooks = async (req, res) => {
  try {
    const { categories, minPrice, maxPrice, publications, authors,sort,perPage } = req.query;
    const page=1;
   
    // Build your query based on the provided criteria
    let query = {};

    if (categories) {
      // Find category by name
      const category = await Category.findOne({ name: categories });

      if (category) {
        query['category'] = category._id;
      }
    }

    // if (minPrice && maxPrice) {
    //   query['price'] = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    // }
    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }
    if (minPrice) {
      query.price = { ...(query.price || {}), $gte: Number(minPrice) };
    }
    if (publications) {
      // Find publication by name
      const publication = await Publication.findOne({ name: publications });

      if (publication) {
        query['publication'] = publication._id;
      }
    }

    if (authors) {
      // Find publication by name
      const author = await Writer.findOne({ name: authors });

      if (author) {
        query['author'] = author._id;
      }
    }

    let sortOptions = {};
    if (sort === "atoz") {
      sortOptions.title = 1;
    } else if (sort === "ztoa") {
      sortOptions.title = -1;
    }

    const total = await Book.countDocuments(query);
    // Perform the search with the constructed query
    const filteredBooks = await Book.find(query)
      .populate("author", "name")
      .populate("category", "name")
      .populate("publication", "name")
      .sort(sortOptions)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json({filteredBooks,total});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while filtering books.",
      error: error.message,
    });
  }
};
```

> routes


```js
router.get("/filter", bookController.filterBooks)
```