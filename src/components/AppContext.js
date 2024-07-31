"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for(const extra of cartProduct.extras){
      price += extra.price
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // save cart to localstorage to handle disappering of cart added products after page refresh
  useEffect(() => {
    const lsCartProducts = ls?.getItem("cart");
    if (lsCartProducts) {
      setCartProducts(JSON.parse(lsCartProducts));
    }
  }, []);

  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const saveCartProductsToLocalStorage = (cartProducts) => {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  };

  //clear cart function
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  // remove product from cart
  function removeCartProduct(indexTORemove) {
    setCartProducts((prevProducts) => {
      const newProducts = prevProducts.filter(
        (v, index) => index !== indexTORemove
      );
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
    toast.success('Product Removed')
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <cartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
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
