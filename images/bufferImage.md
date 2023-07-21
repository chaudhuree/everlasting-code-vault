## backend

- Product model

```js
// Product model:
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 160,
    },
    description: {
      type: {},
      required: true,
      maxlength: 2000,
    },
    photo: {
      data: Buffer,
      contentType: String,
    }
```

- product controller

```js
const { name, description } = req.fields;
const { photo } = req.files;
```

- saving data in database

```js
// create product
const product = new Product({ ...req.fields });
// req.files theke photo ta pailam.mane field er name photo chilo
if (photo) {
  product.photo.data = fs.readFileSync(photo.path);
  product.photo.contentType = photo.type;
}

await product.save(); //save to database
```

- getting all data(except photo)

```js
exports.list = async (req, res) => {
  try {
    const products = await Product.find({}).select("-photo"); // photo bade sob data return korbe

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};
```

- getting specific data without photo

```js
exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).select(
      "-photo"
    );
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};
```

- getting photo

```js
//docs: get photo of a product
exports.photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
  }
};
//  with this response data photo will be shown in fontend
```

- route

```js
router.post("/product", requireSignin, isAdmin, formidable(), create);
router.put("/product/:prductId", requireSignin, isAdmin, formidable(), update);
```

## client side

- creating product

```js
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

// after seleting the photo this code is for preview
  {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">

                {/*COMMENTS:
                  dynamically change the button text after selecting the image
                  the input tag is hidden to show the label properly
                */}

                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit} className="btn btn-primary mb-5">
              Submit
            </button>
          </div>
```

- after selecting photo and giving other data when user press submit then this function fires and send data to backend

```js
//create the product
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    //as we used formidable in the backend, we need to use formdata
    const productData = new FormData();
    //after creating FormData instance, we can append the data
    productData.append("photo", photo);
    productData.append("name", name);
    productData.append("description", description);

    const { data } = await axios.post("/product", productData);
  } catch (err) {
    console.log(err);
    toast.error("Product create failed. Try again.");
  }
};
```

#### amra jokhn backend setup kori tokhn image get kora field ta get method rakhi and so backend a oi route a product id dea hit korlei image ta pawa jabe. so jokhn amra product gulo sob show korbo thik tokhn amra image field ta nicher vabe dibo taholei product er name description er sathe imageta thik tahak vabei dekhabe

```html
// p is the singel product here. after maping the products array we get p for
each single product <img src={`http://localhost:8000/api/v1/produ{p._id}`}
alt={p.name} className="img img-fluid rounded-start" />
```

## update product

```js
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setName(data.name);
      setDescription(data.description);
    } catch (err) {
      console.log(err);
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo); //new kore jodi photo select kora hoy then append kore dibo or ja ase tai hoile ai item er kono dorkar nai.
      productData.append("name", name);
      productData.append("description", description);

      const { data } = await axios.put(`/product/${id}`, productData);
        window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Product create failed. Try again.");
    }
  };

  // return er vitorer code

  // photo update korle to photo er moddhe useState a gea photo store hobe tokhn ? er pore code tuku run hobe otherwise : er porer code run hobe and backend a already stored image ta ene show korabe.
  {photo ? (
      <div className="text-center">
        <img
          src={URL.createObjectURL(photo)}
          alt="product photo"
          className="img img-responsive"
          height="200px"
        />
      </div>
    ) : (
      <div className="text-center">
        <img
          src={`
            http://localhost:8000/api/v1/product/photo/${i{new Date().getTime()}`}
          alt="product photo"
          className="img img-responsive"
          height="200px"
        />
      </div>
    )}
```

```js
    {/* for getting the data for updating purpose */}
    <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSubmit} className="btn btn-primary mb-5">
                Update
              </button>
```
