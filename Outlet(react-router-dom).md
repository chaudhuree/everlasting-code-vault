```js
<Routes>
  <Route path="/products" element={<Products />} />
  <Route path="/products/allproducts" element={<AllProducts />} />
  <Route path="/products/:id" element={<SingleProduct />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

- uporer routing jodi notice kori.

- "/" ai route a gele amra akta products page pabo. like it is the home page. or bolte pari aita daraz er home page.

- now akhn jodi amra daraz er all product dekhte chat then amader route hobe "/products/allproducts". and aita amader all product page.

- akhn single product dekhte chatle amader route hobe "/products/:id". and aita amader single product page.

> **so dekha jasse sob jaygay amader routing a code a age products then path name dea dite hoitice. mane**

```js
  <Route path="/products" element={<Products />} />
  <Route path="/products/allproducts" element={<AllProducts />} />
  <Route path="/products/:id" element={<SingleProduct />} />
```

- now aitar solution hocce nested route . tokhn coding ta hobe..

```js
<Routes>
  <Route path="/products" element={<Products />} >
    <Route path="/allproducts" element={<AllProducts />} />
    <Route path="/:id" element={<SingleProduct />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

- akhn o kintu amader routing ager motoi kaj kobe. but aikhane hakla change ase.
- akhn amra "/products/allproducts" a route a gele all products dekhte parbo na.

- er jonne amader otulet use korete hobe <Products/> ai element tay.

```js
import { Outlet } from "react-router-dom";
const Products = () => {
  return (
    <div>
      <header/>
      {/*  aikhane kicu content thakte pare ja sudhu /products route tay e dekhabe */}
      <Outlet />
    </div>
  );
};
```

- ai way te sob gulo page a header ta pawa jabe and alada kore alada page a header add korte hobe na. mane all product page er khetre..

```js
//  nested route use na korle coding hoite

cont AllProducts = () => {
  return (
    <div>
      <header/>
      ...
      contents
    </div>
  );
};
```

```js
//  nested route(outlet) use korle coding
const AllProducts = () => {
  return (
    <div>
      ...
      contents
    </div>
  );
};
```

- no need to add header for each individual page. just add header in the parent page and use outlet in the parent page.

***akhn akta case ase ta hoitice. amra amader home page. mean, "/products" ai route e ja ja rakhbo ta er child sob page a show korbe. but amra to amonta chai na. mane header show korbe thik ase but products page er to nijossho kicu content thakbe ja sudhu products page tay e dekhabe.so ai khetre inded use korte hobe***

```js
<Routes>
  <Route path="/products" element={<Products />} >
    <Route index element={<ProductContent />} />
    <Route path="/allproducts" element={<AllProducts />} />
    <Route path="/:id" element={<SingleProduct />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

```js
const ProductContent = () => {
  return (
    <div>
      banner
      carousel
      offers
      ...
      contents
    </div>
  );
};
```

***
  aivabei outlet kaj kore nested rote er khetre
***