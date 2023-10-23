# all need to know

- **data for our project (db.json) - run this server using json server**
    
    ```jsx
    {
      "superheroes": [
        {
          "id": 1,
          "name": "Batman",
          "alterEgo": "Bruce Wayne"
        },
        {
          "id": 2,
          "name": "Superman",
          "alterEgo": "Clark Kent"
        },
        {
          "id": 3,
          "name": "Wonder Woman",
          "alterEgo": "Princess Diana"
        }
      ],
      "friends": [
        {
          "id": 1,
          "name": "Chandler Bing"
        },
        {
          "id": 2,
          "name": "Joey Tribbiani"
        },
        {
          "id": 3,
          "name": "Rachel Green"
        }
      ],
      "users": [
        {
          "id": "vishwas@example.com",
          "channelId": "codevolution"
        }
      ],
      "channels": [
        {
          "id": "codevolution",
          "courses": ["react", "vue", "angular"]
        }
      ],
      "colors": [
        {
          "id": 1,
          "label": "red"
        },
        {
          "id": 2,
          "label": "blue"
        },
        {
          "id": 3,
          "label": "green"
        },
        {
          "id": 4,
          "label": "yellow"
        },
        {
          "id": 5,
          "label": "black"
        },
        {
          "id": 6,
          "label": "white"
        },
        {
          "id": 7,
          "label": "orange"
        },
        {
          "id": 8,
          "label": "purple"
        }
      ]
    }
    ```
    
- tradiotianal way to fetch data
    
    ```jsx
    import { useState, useEffect } from 'react'
    import axios from 'axios'
    
    export const SuperHeroesPage = () => {
      const [isLoading, setIsLoading] = useState(true)
      const [data, setData] = useState([])
      const [error, setError] = useState('')
    
      useEffect(() => {
        axios
          .get('http://localhost:4000/superheroes')
          .then(res => {
            setData(res.data)
            setIsLoading(false)
          })
          .catch(error => {
            setError(error.message)
            setIsLoading(false)
          })
      }, [])
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
    
      if (error) {
        return <h2>{error}</h2>
      }
    
      return (
        <>
          <h2>Super Heroes Page</h2>
          {data.map(hero => {
            return <div key={hero.name}>{hero.name}</div>
          })}
        </>
      )
    }
    ```
    
- in react query way data fetching
    1. wrap the root ( as like basic part)
    2. data fetching
    - code
        
        ```jsx
        import { useQuery } from 'react-query'
        import axios from 'axios'
        
        const fetchSuperHeroes=() => {
            return axios.get('http://localhost:4000/superheroes')
          }
        
        export const RQSuperHeroesPage = () => {
          const { isLoading, data } = useQuery('super-heroes',fetchSuperHeroes )
        
          if (isLoading) {
            return <h2>Loading...</h2>
          }
        
          return (
            <>
              <h2>React Query Super Heroes Page</h2>
              {data.data.map(hero => {
                return <div key={hero.name}>{hero.name}</div>
              })}
            </>
          )
        }
        ```
        
- handling error
    
    ```jsx
    import axios from 'axios'
    
    const fetchSuperHeroes=() => {
        return axios.get('http://localhost:4000/superheroes')
      }
    
    export const RQSuperHeroesPage = () => {
      const { isLoading, data, isError, error } = useQuery('super-heroes', fetchSuperHeroes);
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
        return <h2>{error.message}</h2>
      }
    
      return (
        <>
          <h2>React Query Super Heroes Page</h2>
          {data.data.map(hero => {
            return <div key={hero.name}>{hero.name}</div>
          })}
        </>
      )
    }
    ```
    
- qiery cache and stale time
    
    ```jsx
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    export const RQSuperHeroesPage = () => {
      const { isLoading, data, isError, error } = useQuery(
        'super-heroes',
        () => {
          return axios.get('http://localhost:4000/superheroes')
        },
        **{
          cacheTime: 5000,
          staleTime: 10000
        }**
      )
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
      if (isError) {
        return <h2>{error.message}</h2>
      }
      return (
        <>
          <h2>React Query Super Heroes Page</h2>
          {data?.data.map(hero => {
            return <div key={hero.name}>{hero.name}</div>
          })}
        </>
    ```
    
- refetch onMount and windowFocus
    
    ```jsx
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    export const RQSuperHeroesPage = () => {
      const { isLoading, data, isError, error } = useQuery(
        'super-heroes',
        () => {
          return axios.get('http://localhost:4000/superheroes')
        },
        **{
          refetchOnMount:true,
    			refetchOnWindowFoucus:true
        }**
      )
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
      if (isError) {
        return <h2>{error.message}</h2>
      }
      return (
        <>
          <h2>React Query Super Heroes Page</h2>
          {data?.data.map(hero => {
            return <div key={hero.name}>{hero.name}</div>
          })}
        </>
    ```
    
- polling - fetching data at regular intervals
    
    ```jsx
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    export const RQSuperHeroesPage = () => {
      const { isLoading, data, isError, error } = useQuery(
        'super-heroes',
        () => {
          return axios.get('http://localhost:4000/superheroes')
        },
        **{
          refetchInterval:2000,
    			refetchIntervalInBackground:true,
        }**
      )
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
      if (isError) {
        return <h2>{error.message}</h2>
      }
      return (
        <>
          <h2>React Query Super Heroes Page</h2>
          {data?.data.map(hero => {
            return <div key={hero.name}>{hero.name}</div>
          })}
        </>
    ```
    
- useQuery on click. - fetch data on click a button
    
    ```jsx
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    export const RQSuperHeroesPage = () => {
      const { isLoading, data, isError, error, **refetch** } = useQuery(
        'super-heroes',
        () => {
          return axios.get('http://localhost:4000/superheroes')
        },
        **{
          enabled:false,
        }**
      )
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
      if (isError) {
        return <h2>{error.message}</h2>
      }
      return (
        <>
          **<button onClick={refetch}>Fetch heroes</button>**
    
          {data?.data.map(hero => {
            return <div key={hero.name}>{hero.name}</div>
          })}
        </>
    ```
    
- onSuccess and onError
    
    ```jsx
    //globally set error
    import {
      QueryCache,
      QueryClient,
    } from "@tanstack/react-query";
    import { toast } from "react-toastify";
    
    const queryClient = new QueryClient({
      queryCache: new QueryCache({
        onError: (error) => {
          toast(`Something went wrong: ${error.message}`),
        }
      }),
    })
    ```
    
    ```jsx
    export function useTodos() {
      return useQuery({
        queryKey: ['heroes'],
        queryFn: fetchHeroes,
        meta: {
          errorMessage: 'Failed to fetch todos',
        },
      })
    }
    ```
    
- data transformation
    
    ```jsx
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    export const RQSuperHeroesPage = () => {
      const { isLoading, data, isError, error ****} = useQuery(
        'super-heroes',
        () => {
          return axios.get('http://localhost:4000/superheroes')
        },
        **select:(data)=>{
    			const superHeroName= data.data.map(hero=>hero.name)
    		}**
      )
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
      if (isError) {
        return <h2>{error.message}</h2>
      }
      return (
        <>
          
    ****
          **{data?.map(heroname => {
            return <div key={heroname}>{heroname}</div>
          })}**
        </>
    ```
    
- parallel  queries
    
    ```jsx
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    const fetchSuperHeroes = () => {
      return axios.get('http://localhost:4000/superheroes')
    }
    
    const fetchFriends = () => {
      return axios.get('http://localhost:4000/friends')
    }
    
    export const ParallelQueriesPage = () => {
      const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes)
      const { data: friends } = useQuery('friends', fetchFriends)
      console.log(superHeroes, friends)
      return <div>Parallel Queries</div>
    }
    ```
    
- dynamic parallel queries
    
    ```jsx
    function App({ users }) {
      const userQueries = useQueries({
        queries: users.map((user) => {
          return {
            queryKey: ['user', user.id],
            queryFn: () => fetchUserById(user.id),
          }
        }),
      })
    }
    
    ```
    
    ```jsx
    import { useQueries } from 'react-query'
    import axios from 'axios'
    
    const fetchSuperHero = heroId => {
      return axios.get(`http://localhost:4000/superheroes/${heroId}`)
    }
    
    export const DynamicParallelPage = ({ heroIds }) => {
      const queryResults = useQueries(
        heroIds.map(id => {
          return {
            queryKey: ['super-hero', id],
            queryFn: () => fetchSuperHero(id)
          }
        })
      )
    
      console.log({ queryResults })
      return <div>Dynamic Parallel Queries</div>
    }
    ```
    
- dependent parallel queries
    
    ```jsx
    "users": [
        {
          "id": "vishwas@example.com",
          "channelId": "codevolution"
        }
      ],
      "channels": [
        {
          "id": "codevolution",
          "courses": ["react", "vue", "angular"]
        }
      ],
    ```
    
    the scenerio is like this, amader prothom a user email dea user k khuje ber korte hobe then 
    
    oi user k pawa gele user er datar moddhe channelId thakbe. r oi channel id paile tobei amra 
    
    channel er data khuje pabo.
    
    so first a user email dea user k search kore ber kora hoyeche. then user er theke user.channelId nea oita dea channel er data ber kora hoyeche.
    
    `enabled: !!channelId` means , ***The query will not execute until the userId exists***
    
    ```jsx
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    const fetchUserByEmail = email => {
      return axios.get(`http://localhost:4000/users/${email}`)
    }
    
    const fetchCoursesByChannelId = channelId => {
      return axios.get(`http://localhost:4000/channels/${channelId}`)
    }
    
    export const DependentQueriesPage = ({ email }) => {
      const { data: user } = useQuery(['user', email], () =>
        fetchUserByEmail(email)
      )
      const channelId = user?.data?.channelId
      useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId
      })
      return <div>DependentQueries</div>
    }
    ```
    
- initial value
    
    ```jsx
    import { useQuery, **useQueryClient** } from 'react-query'
    import axios from 'axios'
    
    const fetchSuperHero = ({ queryKey }) => {
      const heroId = queryKey[1]
      return axios.get(`http://localhost:4000/superheroes/${heroId}`)
    }
    
    export const useSuperHeroData = heroId => {
      const queryClient = useQueryClient()
      return useQuery(['super-hero', heroId], fetchSuperHero, {
        initialData: () => {
          const hero = queryClient
            .getQueryData('super-heroes')
            ?.data?.find(hero => hero.id === parseInt(heroId))
          if (hero) {
            return { **data: hero** }
          } else {
            return undefined
          }
        }
      })
    }
    ```
    
    ```jsx
    import { useParams } from 'react-router-dom'
    import { useSuperHeroData } from '../hooks/useSuperHeroData'
    
    export const RQSuperHeroPage = () => {
      const { heroId } = useParams()
      const { isLoading, **data**, isError, error } = useSuperHeroData(heroId)
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
        return <h2>{error.message}</h2>
      }
      return (
        <div>
          {**data**.data.name} - {data.data.alterEgo}
        </div>
      )
    }
    ```
    
- pagination
    1. backend pagination support korte hobe
    2. like amra url a page number dea hit korle spcific ammount of data send korbe
    3. mern a paginated backend javabe create kora hoy seivabei korte hobe
    4. just special thing is, font end a age useEffect use korte hoito but akhn just page number change hoile aita automatic backend a call request pathay dibe. no need to use useEffect hook seperately.
    
    ```jsx
    import { useState } from 'react'
    import { useQuery } from 'react-query'
    import axios from 'axios'
    
    const fetchColors = pageNumber => {
      return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
    }
    
    export const PaginatedQueriesPage = () => {
      const [pageNumber, setPageNumber] = useState(1)
    
      const { isLoading, isError, error, data, isFetching } = useQuery(
        ['colors', pageNumber],
        () => fetchColors(pageNumber),
        {
          keepPreviousData: true
        }
      )
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
        return <h2>{error.message}</h2>
      }
    
      return (
        <>
          <div>
            {data?.data.map(color => {
              return (
                <div key={color.id}>
                  <h2>
                    {color.id}. {color.label}
                  </h2>
                </div>
              )
            })}
          </div>
          <div>
            <button
              onClick={() => setPageNumber(page => page - 1)}
              disabled={pageNumber === 1}>
              Prev Page
            </button>
            <button
              onClick={() => setPageNumber(page => page + 1)}
              disabled={pageNumber === 4}>
              Next Page
            </button>
          </div>
          {isFetching && 'Loading'}
        </>
      )
    }
    ```
    
- infiniteQueries
    
    ```jsx
    import { Fragment } from 'react'
    import { **useInfiniteQuery** } from 'react-query'
    import axios from 'axios'
    
    const fetchColors = ({ pageParam = 1 }) => {
      return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
    }
    
    export const InfiniteQueriesPage = () => {
      const {
        isLoading,
        isError,
        error,
        data,
        **fetchNextPage,
        hasNextPage,**
      } = useInfiniteQuery(['colors'], fetchColors, **{
        getNextPageParam: (_lastPage, pages) => {
          if (pages.length < 4) {
            return pages.length + 1
          } else {
            return undefined
          }
        }
      }**)
    
      if (isLoading) {
        return <h2>Loading...</h2>
      }
    
      if (isError) {
        return <h2>{error.message}</h2>
      }
    
      return (
        <>
          <div>
            {data?.**pages**.map((group, i) => {
              return (
                <Fragment key={i}>
                  {group.data.map(color => (
                    <h2 key={color.id}>
                      {color.id} {color.label}
                    </h2>
                  ))}
                </Fragment>
              )
            })}
          </div>
          <div>
            **<button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
              Load more
            </button>**
          </div>
          
        </>
      )
    }
    ```
    

- mutation
    
    ```jsx
    import { useMutation } from 'react-query'
    function App() {
      const mutation = useMutation({
        mutationFn: (newTodo) => {
          return axios.post('/todos', newTodo)
        },
      })
      return (
        <div>
          {mutation.isLoading ? (
            'Adding todo...'
          ) : (
            <>
              {mutation.isError ? (
                <div>An error occurred: {mutation.error.message}</div>
              ) : null}
              {mutation.isSuccess ? <div>Todo added!</div> : null}
              <button
                onClick={() => {
                  mutation.mutate({ id: new Date(), title: 'Do Laundry' })
                }}
              >
                Create Todo
              </button>
            </>
          )}
        </div>
      )
    }
    
    ```
    
    ```jsx
    import {  useMutation } from 'react-query'
    import axios from 'axios'
    
    const addSuperHero = hero => {
      return axios.post('http://localhost:4000/superheroes', hero)
    }
    
    const useAddSuperHeroData = () => {
      return useMutation(addSuperHero)
    }
    
    const { mutate,isLoading,isError,error } = useAddSuperHeroData()
    
    mutate({ "captain america", "man with a shield"})
    ```
    
- invalidation - ( automated refetching after mutation )
    
    ```jsx
    import { useQuery, useMutation, **useQueryClient** } from 'react-query'
    
    export const useAddSuperHeroData = () => {
      **const queryClient = useQueryClient()**
    
      return useMutation(addSuperHero, **{
        onSuccess: () => {
          queryClient.invalidateQueries('super-heroes')
        }
      }**)
    }
    ```
    
- invalidation - ( automated refetching after mutation ) → alternative approach
    
    ```jsx
    import { useQuery, useMutation, **useQueryClient** } from 'react-query'
    
    export const useAddSuperHeroData = () => {
      **const queryClient = useQueryClient()**
    
      return useMutation(addSuperHero, **{
        onSuccess: (data) => {
          queryClient.setQureyData('super-heroes',(oldQueryData)=>{
    					return{
    						...oldQueryData,
    						data:[...oldQueryData,data.data]
    
    					}
    
    			})
        }
      }**)
    }
    ```
    
- optimistic update
