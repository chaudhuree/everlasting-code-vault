
```js
// Define your API endpoint for pagination
app.get('/books/:pageNo/:perPage/:searchKeyword', bookList);
http://localhost:5000/api/v1/books/1/10/0
http://localhost:5000/api/v1/books/1/10/harry

```

```js
exports.bookList=async (req, res) => {
  try {
    const { page, pageSize, search,shipping } = req.params;

    // Convert page and pageSize to integers
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(pageSize) || 10;

    // query single field

    // Build the MongoDB query
    // const query = {};
    // if (search && search !== '0') {
    //   query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    // }

    // query multiple fields
  const query = {};
  query.shipping = shipping;
  if (search && search !== '0') {
  const searchRgx = new RegExp(search, 'i');

  query.$or = [
    { title: { $regex: searchRgx } },   // Case-insensitive search in the 'title' field
    //✅✅ { title: searchRgx  },   //if uppoer line not work then use this line
    { author: { $regex: searchRgx } }, 
    { category: { $regex: searchRgx } },
    // Add more fields as needed for your search
  ];
}
    // Execute the count query
    let totalCount;
    if (search && search !== '0') {
      totalCount = await Book.countDocuments(query);
    } else {
      totalCount = await Book.countDocuments();
    }

    // Execute the main query with skip and limit
    const books=[]
    if (search && search !== '0') {
      books = await Book.find(query)
        .skip((pageNumber - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .sort({ title: 1 });
    } else {
      books = await Book.find()
        .skip((pageNumber - 1) * itemsPerPage)
        .limit(itemsPerPage)
        .sort({ title: 1 });
    }

    res.json({ data: books, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
```