**Context api for add to cart:**

---

1. Create `CartContext.js` for the context, reducer, and provider:

```jsx
import React, { createContext, useContext, useEffect, useReducer } from "react";

// CartReducer.js
export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].qty += 1;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      } else {
        const updatedCart = [...state.cart, { ...action.payload, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, cart: updatedCart };
      }
    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return { ...state, cart: filteredCart };
    case "INCREASE_CART_QTY":
      const increasedCart = state.cart.map((item) =>
        item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(increasedCart));
      return { ...state, cart: increasedCart };
    case "DECREASE_CART_QTY":
      const decreasedCart = state.cart.map((item) =>
        item._id === action.payload._id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(decreasedCart));
      return { ...state, cart: decreasedCart };
    case "EMPTY_CART":
      localStorage.removeItem("cart");
      return { ...state, cart: [] };
    default:
      return state;
  }
};

// CartContext.js
const Cart = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
  });

  useEffect(() => {
    const oldCart = localStorage.getItem("cart");
    if (oldCart) {
      dispatch({ type: "SET_CART", payload: JSON.parse(oldCart) });
    }
  }, []);

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export const useCart = () => {
  return useContext(Cart);
};
```

2. In your main application file (e.g., `App.js`), wrap your components with the `CartProvider`:

```jsx
import React from "react";
import { CartProvider } from "./CartContext";

import YourAppRootComponent from "./YourAppRootComponent";

function App() {
  return (
    <CartProvider>
      <YourAppRootComponent />
    </CartProvider>
  );
}

export default App;
```

3. Finally, in your component (e.g., `BookCard.js`), use the cart context:

```jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Import useCart from your CartContext

const BookCard = ({ book, category }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart(); // Get state and dispatch from the cart context

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: book });
  };

  return (
    <div className="container mr-5">
      <div className="row">
        <div className="book-card">
          <div className="cart_button">
            <button type="button" className="button" onClick={handleAddToCart}>
              <span className="button__text">Add Item</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
```

`DECREASE_CART_QTY`, `INCREASE_CART_QTY` and `EMPTY_CART` :

```jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const BookCard = ({ book, category }) => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: book });
  };

  const handleIncreaseQty = () => {
    dispatch({ type: "INCREASE_CART_QTY", payload: book });
  };

  const handleDecreaseQty = () => {
    dispatch({ type: "DECREASE_CART_QTY", payload: book });
  };

  const handleClearCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  const handleCardClick = () => {
    navigate(`/book/${book._id}/${category._id}`);
  };

  return (
    <div className="container mr-5">
      <div className="row">
        <div className="book-card" onClick={handleCardClick}>
          {/* ... your existing JSX ... */}
          <div className="cart_button">
            <button type="button" className="button" onClick={handleAddToCart}>
              <span className="button__text">Add Item</span>
              {/* ... your existing SVG ... */}
            </button>
            <button
              type="button"
              className="button"
              onClick={handleIncreaseQty}
            >
              <span className="button__text">Increase Qty</span>
              {/* ... your existing SVG ... */}
            </button>
            <button
              type="button"
              className="button"
              onClick={handleDecreaseQty}
            >
              <span className="button__text">Decrease Qty</span>
              {/* ... your existing SVG ... */}
            </button>
            <button type="button" className="button" onClick={handleClearCart}>
              <span className="button__text">Clear Cart</span>
              {/* ... your existing SVG ... */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
```
