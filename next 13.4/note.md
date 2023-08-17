## url params in Next js 13.4

```js
// this is for url params like id and name
// http:localhost:3000/?name=${post.creator.username}&id=${post.id}

import { useSearchParams } from "next/navigation";

const params = useSearchParams();

const paramsValue = params.get("name");
const id = params.get("id");
```

## pathname and route in Next.js 13.4

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

## Image in Next.js 13.4

```js
import Image from "next/image";
// image in the public folder with the name image.jpg
//  we can access the image in the public folder by just putting a "/ " infront of the image name. because "/" refers to the public folder by default
<Image src="/image.jpg" alt={post.title} width={100} height={100} className="rounded-lg"/>
```
> image without height width:
> this is used for single image. fill={true}
> this code will give the image it's parents height and width.
> but if anyone want to use icon like in the footer social icon for facebook ,instagram etc. then image with height and width will be better choice.

```js
.imgContainer{
    position: relative; // giving position relative is must
    width:100px;
    height:100px;
}
<div className="imgContainer">
    // image without height width
    <Image src="/image.jpg" fill={true}/>

</div>
```
> in case anyone like to import then image first then use.
> for public folder till now / represented the public folder. now to import you need to mention this 

```js
import HeroImage from "public/image.jpg"

<Image src={HeroImage}/> // it will throw no error if height width is not given
```

> but to use external image link need to tell next js config file about it's domain

```js

next.config.js

const nextConfig={
    images:{
        domains=[
            "images.pixels.com"
        ]
    }
}

<Image src="iamges.pixels.com/1232323cdsre/hero.jpg" height={25} width={25}/>
```

## Link in Next.js 13.4

```js
// used in the navbar
import Link from "next/link";
<Link href="/dashboard">Dashboard</Link>

```

## dynamic routes in Next.js 13.4

```js
// page structure
app/blog/[slug]/page.js

// dynamic routes
// app/blog/new-post
export default function Page({ params }) {
    return <div>My Post: {params.slug}</div>
//     My Post: new-post
}
```

## Layout in Next.js 13.4

```js
// in every directory we can use layout.jsx for metadata
// for metadata
export const metadata = {
    title: "My Blog",
    description: "My Blog",
}
```

## Next Fonts in Next.js 13.4
 
```js
import { Ubuntu,Open_Sans,Roboto,Poppins} from 'next/font/google'

const ubuntu = Ubuntu({
    weight: ['400', '700'],
    subsets: ['latin'],
})
const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    
})
const openSans = Open_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-open-sans',
})
const poppins = Poppins({
    weight: ['400', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
})
export default function MyApp() {
    return (
        <main >
            <h1 className={roboto.className}>This text will have roboto font</h1>
            
            <p className={openSans.className}> this is a paraghaph with open sans font</p>
            
            <p style={roboto.style}>this paragrap with roboto font</p>
        </main>
    )
}

//global.css

// full html will have open sans font like this
html {
    font-family: var(--font-open-sans);
    font-size: 16px;
    font-weight: 700;
}
// div with class blog will have poppins font
.blog {
    font-family: var(--font-poppins);
}
```

## for local font
```js
import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './my-font.woff2' })

export default function MyApp() {
    return (
        <main className={myFont.className}>
        </main>
    )
}

```