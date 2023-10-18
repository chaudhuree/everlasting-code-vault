# redux

- installation
- create slice
- create store
- provide store that slice
- wrap main.js or index.js (root file)
- using dispatch and selector use this value

---

---

- installation
    
    npm install @reduxjs/toolkit
    
    npm install react-redux
    
    redux-persist
    
- slice
    - firstSlice.js
        
        ```jsx
        import { createSlice } from '@reduxjs/toolkit';
        
        const initialState = {
          firstData: null,
          loading: false,
          error: false,
        };
        
        const firstSlice = createSlice({
          name: 'first',
          initialState,
          reducers: {
            loadingStart: (state) => {
              state.loading = true;
            },
        		loadingEnd: (state) => {
        			state.loading = false;
        		},
        		dataAdd: (state,action) => {
        		  state.firstData = action.payload;
        		},
        		errorHappen: (state) => {
        			state.error=true;
        		},
        		errorClean: (state) => {
        			state.error=false;
        		} 
          },
        });
        
        export const {
          loadingStart,
        	loadingEnd,
        	dataAdd,
        	errorHappen,
        	errorClean
        } = firstSlice.actions;
        
        export default firstSlice.reducer;
        ```
        
    - secondSlice.js
        
        ```jsx
        import { createSlice } from '@reduxjs/toolkit';
        
        const initialState = {
          secondData: null,
          loading: false,
          error: false,
        };
        
        const secondSlice= createSlice({
          name: 'second',
          initialState,
          reducers: {
            loadingStart: (state) => {
              state.loading = true;
            },
        		loadingEnd: (state) => {
        			state.loading = false;
        		},
        		dataAdd: (state,action) => {
        		  state.firstData = action.payload;
        		},
        		errorHappen: (state) => {
        			state.error=true;
        		},
        		errorClean: (state) => {
        			state.error=false;
        		} 
          },
        });
        
        export const {
          loadingStart,
        	loadingEnd,
        	dataAdd,
        	errorHappen,
        	errorClean
        } = secondSlice.actions;
        
        export default secondSlice.reducer;
        ```
        
    
- store
    
    ```jsx
    import { combineReducers, configureStore } from '@reduxjs/toolkit';
    import firstReducer from './first/firstReducer.js';
    import secondReducer from './second/secondReducer.js';
    import { persistReducer, persistStore } from 'redux-persist';
    import storage from 'redux-persist/lib/storage';
    
    const rootReducer = combineReducers({ first: firstReducer, second: secondReducer });
    
    const persistConfig = {
      key: 'root',
      version: 1,
      storage,
    };
    
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    
    export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    });
    
    export const persistor = persistStore(store);
    ```
    
- main.jsx (wrap the root)
    
    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx';
    import { persistor, store } from './redux/store.js';
    import { Provider } from 'react-redux';
    import { PersistGate } from 'redux-persist/integration/react';
    
    ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <App />
        </PersistGate>
      </Provider>
    );
    ```
    
- usage
    
    ```jsx
    import {
    	loadingStart,
    	loadingEnd,
    	dataAdd,
    	errorHappen,
    	errorClean
    } from '../redux/first/firstSlice';
    import {
    	loadingStart,
    	loadingEnd,
    	dataAdd,
    	errorHappen,
    	errorClean
    } from '../redux/second/secondSlice';
    import { useDispatch, useSelector } from 'react-redux';
    
    export default function ReduxUsage() {
      
      const { loading, error, firstData } = useSelector((state) => state.first);
    	const { loading, error, secondData} = useSelector((state) => state.second);
      const dispatch = useDispatch();
    
      const firstDataGetting = async (e) => {
        e.preventDefault();
        try {
    			dispatch(errorClean());
          dispatch(loadingStart());
          const res = await fetch('http://dummydata.first.com'
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(errorHappen());
            return;
          }
          dispatch(dataAdd(data));
          dispatch(loadingEnd());
        } catch (error) {
    			dispatch(loadingEnd());
          dispatch(errorHappen());
        }
      };
      
    
    	const secondDataGetting = async (e) => {
        e.preventDefault();
        try {
    			dispatch(errorClean());
          dispatch(loadingStart());
          const res = await fetch('http://dummydata.second.com'
          });
          const data = await res.json();
          if (data.success === false) {
            dispatch(errorHappen());
            return;
          }
          dispatch(dataAdd(data));
          dispatch(loadingEnd());
        } catch (error) {
    			dispatch(loadingEnd());
          dispatch(errorHappen());
        }
      };
      return (
        <div>
          <button onClick={firstDataGetting }>first button</button>
    			<button onClick={secondDataGetting }>second button</button>
    			{firstData.length}
    			{secondData.length}
        </div>
      );
    }
    ```