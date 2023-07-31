```js
Router.get("/users/:pageNo/:perPage/:searchKeyword", userList)
http://localhost:5000/api/v1/users/1/10/0
http://localhost:5000/api/v1/users/1/10/John
```

```js
exports.userList = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo) || 1;
    let perPage = Number(req.params.perPage) || 10;
    let searchValue = req.params.searchKeyword;
    let skipRow = (pageNo - 1) * perPage;

    let data;
    if (searchValue !== "0") {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      // search in every possible field
      let SearchQuery = {
        $or: [{ name: SearchRgx }, { email: SearchRgx }],
      };

      data = await User.aggregate([
        {
          $facet: {
            Total: [
              { $match: SearchQuery },
              { $match: { role: { $eq: 0 } } },
              { $count: "count" },
            ],
            Rows: [
              { $match: SearchQuery },
              { $match: { role: { $eq: 0 } } },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    } else {
      data = await User.aggregate([
        {
          $facet: {
            Total: [{ $match: { role: { $eq: 0 } } }, { $count: "count" }],
            Rows: [
              { $match: { role: { $eq: 0 } } },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    }
    // console.log('data', data[0].Rows[0]);

    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(200).json({ status: "fail", error: error });
  }
};
```

```js
exports.adminList = async (req, res) => {
  try {
    let pageNo = Number(req.params.pageNo) || 1;
    let perPage = Number(req.params.perPage) || 10;
    let searchValue = req.params.searchKeyword;
    let skipRow = (pageNo - 1) * perPage;

    let data;
    if (searchValue !== "0") {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      // search in every possible field
      let SearchQuery = {
        $or: [{ name: SearchRgx }, { email: SearchRgx }],
      };

      data = await User.aggregate([
        {
          $facet: {
            Total: [
              { $match: SearchQuery },
              { $match: { role: { $eq: 1 } } },
              { $count: "count" },
            ],
            Rows: [
              { $match: SearchQuery },
              { $match: { role: { $eq: 1 } } },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    } else {
      data = await User.aggregate([
        {
          $facet: {
            Total: [{ $match: { role: { $eq: 1 } } }, { $count: "count" }],
            Rows: [
              { $match: { role: { $eq: 1 } } },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    }
    // console.log('data', data[0].Rows[0]);

    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(200).json({ status: "fail", error: error });
  }
};
```
