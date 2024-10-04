"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext({});

// Function to calculate the price of a cart product
export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // Load cart from local storage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartProducts(JSON.parse(storedCart));
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // Clear the cart
  function clearCart() {
    setCartProducts([]);
    toast.success("Cart cleared!");
  }

  // Remove product from the cart by id
  function removeCartProduct(productId) {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
    toast.success("Product removed");
  }

  // Add a product to the cart
  function addToCart(product, size = null, extras = []) {
    const newProduct = { ...product, size, extras };
    setCartProducts((prevProducts) => [...prevProducts, newProduct]);
    toast.success("Product added to cart!"); // Uncomment this line to show a toast
  }

  return (
    <SessionProvider>
      <cartContext.Provider
        value={{
          cartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </cartContext.Provider>
    </SessionProvider>
  );
}
