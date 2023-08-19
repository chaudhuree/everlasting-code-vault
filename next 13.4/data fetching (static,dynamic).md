## static data fetching

```js
// if data is not changing frequently
import { notFound } from 'next/navigation'
async function getData() {
  const res = await fetch('https://api.example.com/...')

 
  if (!res.ok) {
    // throw new Error('Failed to fetch data')
      return notFound()
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main></main>
}
```

## revalidate data

```js
// if data is changing but not so frequently
async function getData() {
  const res = await fetch('https://api.example.com/...',{
      next:{revalidate:10}
  })
    
    if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main></main>
}
```

## no cache

## revalidate data

```js
// if data is changing so frequently
async function getData() {
  const res = await fetch('https://api.example.com/...',{
      next:{cache:"no-store"}
  })
    
    if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
 
  return <main></main>
}
```