## url params in next js 13.4

```js
// this is for url params like id and name
// http:localhost:3000/?name=${post.creator.username}&id=${post.id}

import { useSearchParams } from "next/navigation";

const params = useSearchParams();

const paramsValue = params.get("name");
const id = params.get("id");
```

## pathname and route in next js 13.4

```js
import { usePathname, useRouter } from "next/navigation";

const pathname = usePathname();
const router = useRouter();

// now like if pathname is "/profile" then do the stuff otherwise don't
if(pathName === "/profile"){
    // do the stuff
}

// for route. after doing the stuff go to dashboard
router.push("/dashboard");

```