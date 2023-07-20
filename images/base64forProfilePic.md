# userimage ,icon etc should be stored in the database. but it should be in small size. so the perfect solution for this is base64 encoded

## database stored way

```js
const DataSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  photo: { type: String },
});
```

# demonstrates for a user profile picture.

> ## now suppose we have a backend and from the backend api we can get user's profile data and it is stored in the variable "ProfileData". in this ProfileData user's profile image is stored in the photo property.
>
> ## so to get the user profile image we need to give the path like, ProfileData.photo or ProfileData['photo'].

- so now we can show the profile picture in the fontend image property like this,

```js
<img src={ProfileData['photo']} alt=""/>

// now from react we can store or select the dom like getElementBYId using the useRef hook. so , for purpose i am storing the image reference in a ref called userImgViw like this.
let userImgView = useRef()
<img  ref={(input)=>userImgView=input} src={ProfileData['photo']} alt=""/>
```

## now we want to update the profile picture. then one thing to be noted while updating the image we also need to previw the image as well. otherwise it will not going to be a good user experience.

- so we need a input and also need a ref to store the image value . we can do this in two way like: useState or useRef.
- here we are going to use useRef()

```js
let userImgRef = useRef();

<input
  ref={(input) => (userImgRef = input)}
  placeholder="User Image"
  type="file"
/>;
```

- now when we choose an image then we need to trigger onChange method. so we can do this like this,

```js
<input
  onChange={PreviewImage}
  ref={(input) => (userImgRef = input)}
  placeholder="User Image"
  type="file"
/>
```

- now here is the interesting part.PreviewImage is the function where we are going to do a lot.
- we will convert the image into base64 then set the src attribute of userImgView to the converted image. this way as this userImgView is referencing to the img element so when the src is set then it will change the previous image and show the updated one as a preview.
- then we can use this base64 encoded image url to store it in the database.

> #### functionality:

```js
// at first we need a base64 encoder function,
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
```

- now we will use this getBase64 function in the PreviewImage function and convert the image then change the userImgView src attribute and also it will be ready by then to store in the database.

```js
const PreviewImage = () => {
  let ImgFile = userImgRef.files[0];
  getBase64(ImgFile).then((base64Img) => {
    userImgView.src = base64Img;
  });
};
```

## as PreviewImage is being called in the onChange event handler so whenever user choose a picture then it will imediately convert into base64 then change the profile picture preview and give us the base64 encoded image url to store in the database.

- now we can store the base64 encoded image url in the database and also we can show the profile picture in the frontend using the same url.

## so now to update a user profile we can do below this,

```js
// withyhid function we can chage user profile picture in the database.
// ProfileUpdateRequest has necessary backend calling method.
const UpdateMyProfile = async () => {
  let photo = userImgView.src;
  // 🔼🔼 this is holding the updated profile image,or if user does not change the profile pic then it will hold the old profile image
  // so userImageView.src is the safest way to get the profile image to update
  let result = await ProfileUpdateRequest(photo);
};
```

```js
export async function ProfileUpdateRequest(photo) {
  try {
    let PostBody = { photo: photo };
    let res = await axios.post(URL, PostBody, AxiosHeader);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("error", e.message);
    return false;
  }
}
```
