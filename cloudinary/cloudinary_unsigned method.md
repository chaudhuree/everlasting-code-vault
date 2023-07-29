- create account

- go to settings tab

- click on upload tab

- upload preset: unsigned uploading enable a click korte hobe

- niche add upload preset option a click

- then next tab a akta name dite hobe
 - this will be our preset_key

- tar niche dropdown ase oitay unsigned select korte hobe

- save

- then dashboard a jaite hobe and oikhane amra could name pabo

> last coding

***

```js
import { useState } from "react";

const axios = require("axios");

function UploadFile(){
  const [image, setImage] = useState("");

  const preset_key="preset_key";
  const cloud_name="cloud_name";

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "preset_key");
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      data
    );
    setImage(res.data.secure_url);
  };
  return (
    <div>
      <input type="file" name="image" onChange={uploadImage} />
      <img src={image} alt="" />
    </div>
  );
}

```

- so what can we do in case of mern stack

- image er on change a ai uploadImage function ta run koray then image url ta nea nite parbo.

- so jokhn image upload hoitice tokhn amra akta loader on koray dea dite pari
- ai loader ta full screen hobe so jate jokhn loader cholbe tokhn page a kono kicu click kora jabe na.

- image ta upload howar time a and jokhn loader true thakbe tokhn amra image field a akta scaleton image dekhabo like loading..

- jokhn image ta upload hoye jabe and state a save hoye jabe tokhn loder off hobe. then amra to image url ta image state a paye gelam. seta nea kahn amra backend a data pathanor time a pathay dibo string akare 

- done