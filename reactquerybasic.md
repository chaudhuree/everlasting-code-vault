# basic

**API:** 

[products link](https://dummyjson.com/)

**installation**

```jsx
npm i react-query
```

two basic system:

- query - data fetching
- mutation - data post,data update

**coding**

1. wrap the main.jsx or app.jsx  (root)
- wrapping
    
    ```jsx
    import React from 'react';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx';
    
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    const queryClient = new QueryClient();
    
    ReactDOM.createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    );
    ```
    
1. data fetching
- fetching data in file
    
    ```jsx
    //in fetching file
    import { useQuery } from '@tanstack/react-query';
    
    const fetchProducts = async () => {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    };
    
    const Products = () => {
        const {
            isLoading,
            error,
            data: products,
        } = useQuery({
            queryKey: ['products'],
            queryFn: fetchProducts,
        });
    
        if (isLoading) {
            return <h3>Loading...</h3>;
        }
    
        if (error) {
            return <h3>Error: {error.message}</h3>;
        }
    
        return (
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Customers also purchased
                    </h2>
    
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={`/products/${product.id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
    
    export default Products;
    ```
    
1. chche data
- for data caching and do it universal
    
    ```jsx
    import React from 'react';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx';
    
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 10000,  // it will refetch data after every 10s
            },
        },
    });
    
    ReactDOM.createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    );
    ```
    
- caching while fetching data
    
    ```jsx
    //root
    import React from 'react';
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx';
    
    import { createBrowserRouter, RouterProvider } from 'react-router-dom';
    
    const queryClient = new QueryClient();
    
    ReactDOM.createRoot(document.getElementById('root')).render(
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    );
    ```
    
    ```jsx
    //in fetching file
    import { useQuery } from '@tanstack/react-query';
    
    const fetchProducts = async () => {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        return data.products;
    };
    
    const Products = () => {
        const {
            isLoading,
            error,
            data: products,
        } = useQuery({
            queryKey: ['products'],
            queryFn: fetchProducts,
    	      **staleTime: 10000,**
        });
    
        if (isLoading) {
            return <h3>Loading...</h3>;
        }
    
        if (error) {
            return <h3>Error: {error.message}</h3>;
        }
    
        return (
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Customers also purchased
                    </h2>
    
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <Link to={`/products/${product.id}`}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };
    
    export default Products;
    ```
    

1. for using devtool
    - installation
        
        ```jsx
        npm i @tanstack/react-query-devtools
        ```
        
    - wrap root
        
        ```jsx
        import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
        
        function main() {
          return (
            <QueryClientProvider client={queryClient}>
        	     <App/>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          )
        }
        ```
        

1. for single product data fetching method
- for single product
    
    ```jsx
    import {useQuery } from '@tanstack/react-query';
    import { useParams } from 'react-router-dom';
    
    const Product = () => {
        const params = useParams();
    
        const fetchProduct = async () => {
            const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
            const data = await response.json();
            return data;
        };
    
        const {
            isLoading,
            error,
            data: product,
        } = useQuery({
            queryKey: ['product', **params.productId**],
            queryFn: fetchProduct,
            // staleTime: 10000,
        });
    
        if (isLoading) {
            return <h3>Loading...</h3>;
        }
    
        if (error) {
            return <h3>Error: {error.message}</h3>;
        }
    
        return (
            <>
                <div>Product: {product.title}</div>
            </>
        );
    };
    
    export default Product;
    ```
    
- mutation
    
    ```jsx
    import { useMutation, useQuery } from '@tanstack/react-query';
    import axios from 'axios';
    import { useParams } from 'react-router-dom';
    
    const Product = () => {
        const params = useParams();
        // Mutations
        const mutation = useMutation({
            mutationFn: (newProduct) => {
                return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct);
            },
        });
    
        const fetchProduct = async () => {
            const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
            const data = await response.json();
            return data;
        };
    
        const {
            isLoading,
            error,
            data: product,
        } = useQuery({
            queryKey: ['product', params.productId],
            queryFn: fetchProduct,
            // staleTime: 10000,
        });
    
        if (isLoading) {
            return <h3>Loading...</h3>;
        }
    
        if (error) {
            return <h3>Error: {error.message}</h3>;
        }
    
        if (mutation.isLoading) {
            return <h3>Updating...</h3>;
        }
    
        if (mutation.isError) {
            return <h3>Error while updating. {mutation.error.message}</h3>;
        }
    
        return (
            <>
                <div>Product: {product.title}</div>
    
                <button
                    onClick={() => {
                        mutation.mutate({ title: 'Updated product' });
                    }}>
                    Create product
                </button>
            </>
        );
    };
    
    export default Product;
    ```
