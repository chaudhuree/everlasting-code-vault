- create a paginate component

```js
const paginate = (data) => {
  const itemsPerPage = 9
  const numberOfPages = Math.ceil(data.length / itemsPerPage)

  const newData = Array.from({ length: numberOfPages }, (_, index) => {
    // index=[0,1,2,3,4,5,6,7,8,9,10,11]
    // ⬇⬇ start= 0 9 18 27 36 45 54 63 72 81 90 99
    const start = index * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  })

  return newData
}

export default paginate
```
***

- we can create a hook for fetching data and use paginate function there..

```js
import { useState, useEffect } from 'react'
import paginate from './utils'
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100'

export const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const getProducts = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setData(paginate(data))
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [])
  return { loading, data }
}
```

- from this hook it return data and loading state so we can use this in the main page and show data with pagination..
  - for example we are using followers data from github api and show them with pagination..

```js
import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
function App() {
  const { loading, data } = useFetch()
  const [page, setPage] = useState(0)
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > data.length - 1) {
        nextPage = 0
      }
      return nextPage
    })
  }
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 0) {
        prevPage = data.length - 1
      }
      return prevPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }

  return (
    <main>
      <section >
        <div>
          {followers.map((follower) => {
            return <p key={follower.id} > {follower.name}</p>
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              )
            })}
            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App

```

***

- css for pagination button

```css
:root {
  /* dark shades of primary color*/
  --clr-primary-1: hsl(205, 86%, 17%);
  --clr-primary-2: hsl(205, 77%, 27%);
  --clr-primary-3: hsl(205, 72%, 37%);
  --clr-primary-4: hsl(205, 63%, 48%);
  /* primary/main color */
  --clr-primary-5: hsl(205, 78%, 60%);
  /* lighter shades of primary color */
  --clr-primary-6: hsl(205, 89%, 70%);
  --clr-primary-7: hsl(205, 90%, 76%);
  --clr-primary-8: hsl(205, 86%, 81%);
  --clr-primary-9: hsl(205, 90%, 88%);
  --clr-primary-10: hsl(205, 100%, 96%);
  /* darkest grey - used for headings */
  --clr-grey-1: hsl(209, 61%, 16%);
  --clr-grey-2: hsl(211, 39%, 23%);
  --clr-grey-3: hsl(209, 34%, 30%);
  --clr-grey-4: hsl(209, 28%, 39%);
  /* grey used for paragraphs */
  --clr-grey-5: hsl(210, 22%, 49%);
  --clr-grey-6: hsl(209, 23%, 60%);
  --clr-grey-7: hsl(211, 27%, 70%);
  --clr-grey-8: hsl(210, 31%, 80%);
  --clr-grey-9: hsl(212, 33%, 89%);
  --clr-grey-10: hsl(210, 36%, 96%);
  --clr-white: #fff;
  --clr-red-dark: hsl(360, 67%, 44%);
  --clr-red-light: hsl(360, 71%, 66%);
  --clr-green-dark: hsl(125, 67%, 44%);
  --clr-green-light: hsl(125, 71%, 66%);
  --clr-black: #222;

  --transition: all 0.3s linear;
  --spacing: 0.1rem;
  --radius: 0.75rem;
  --light-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  --dark-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  --max-width: 1170px;
  --fixed-width: 620px;
}
.btn-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.page-btn {
  width: 2rem;
  height: 2rem;
  background: var(--clr-primary-7);
  border-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  margin: 0.5rem;
  transition: var(--transition);
}
.active-btn {
  background: var(--clr-primary-1);
  color: var(--clr-white);
}
.prev-btn,
.next-btn {
  background: transparent;
  border-color: transparent;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: var(--spacing);
  margin: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

@media screen and (min-width: 775px) {
  .btn-container {
    margin: 0 auto;
    max-width: 700px;
  }
}
```