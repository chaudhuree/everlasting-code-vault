1. **Create a WishlistContext:**

```jsx
// WishlistContext.js
import { createContext, useContext, useEffect, useReducer } from "react";

const Wishlist = createContext();

const WishlistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { wishlist: [] });

  useEffect(() => {
    const oldWishlist = localStorage.getItem("bnwish");
    if (oldWishlist) {
      dispatch({ type: "SET_WISHLIST", payload: JSON.parse(oldWishlist) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bnwish", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <Wishlist.Provider value={{ state, dispatch }}>
      {children}
    </Wishlist.Provider>
  );
};

export const useWishlist = () => {
  return useContext(Wishlist);
};

export default WishlistContextProvider;
```

2. **Create a wishlistReducer:**

```jsx
// wishlistReducer.js
export const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.wishlist.some((item) => item._id === action.payload._id)) {
        // If already in wishlist, remove it
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (item) => item._id !== action.payload._id
          ),
        };
      } else {
        // If not in wishlist, add it
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }
    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload };
    default:
      return state;
  }
};
```

3. **Wrap your App with the WishlistContextProvider:**

```jsx
// index.js or App.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WishlistContextProvider from "./context/WishlistContext"; // Adjust the path

ReactDOM.render(
  <React.StrictMode>
    <WishlistContextProvider>
      <App />
    </WishlistContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

4. **Using the WishlistContext in a component:**

```jsx
import React from "react";
import { useWishlist } from "./context/WishlistContext"; // Adjust the path

const BookCard = ({ book }) => {
  const { state, dispatch } = useWishlist();

  const handleWishlistClick = () => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: book });
  };

  const isBookInWishlist = state.wishlist.some((item) => item._id === book._id);

  return (
    <div>
      {/* Your book card content */}
      <button onClick={handleWishlistClick}>
        {isBookInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
};

export default BookCard;
```
