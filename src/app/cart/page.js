"use client";

import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { cartContext, cartProductPrice } from "../../components/AppContext";
import toast from "react-hot-toast";
import CartProduct from "../../components/menu/CartProduct";
import AddressInputs from "../../components/layout/AddressInputs";
import { useProfile } from "../../components/layout/useProfile";
import { useSession } from "next-auth/react";
import Loader from "../../components/loader/loader";


export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(cartContext);
  const [address, setAddress] = useState({});
  const { data: loggedInUserData } = useProfile();
  const session = useSession();
  const { status } = session;

  // Hook to handle payment cancellation
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href.includes("cancelled=1")) {
      toast.error("Payment canceled!");
    }
  }, []);

  // Hook to set address if user profile is available
  useEffect(() => {
    if (loggedInUserData?.city) {
      const { phone, streetAddress, city, postalCode, country } = loggedInUserData;
      setAddress({ phone, streetAddress, city, postalCode, country });
    }
  }, [loggedInUserData]);

  // Address change handler
  function handleAddressChange(propName, value) {
    setAddress((prev) => ({ ...prev, [propName]: value }));
  }

  // Calculate subtotal
  let subtotal = cartProducts.reduce((sum, p) => sum + cartProductPrice(p), 0);

  // Checkout handler
  async function proceedToCheckout(ev) {
    ev.preventDefault();
    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, cartProducts }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json(); // Redirect to Stripe payment
        } else {
          reject();
        }
      });
    });

    await toast.promise(promise, {
      loading: "Preparing your order...",
      success: "Redirecting to payment...",
      error: "Something went wrong... Please try again later",
    });
  }

  // Display loading state if session is loading
  if (status === "loading") {
    return (
      <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <Loader />
      </div>
    )
  }

  // Display unauthenticated state if user is not logged in
  if (status === "unauthenticated") {
    return (
      <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionHeaders subHeader="You must be logged in" mainHeader="To view your cart." />
        </div>
      </div>
    );
  }

  // Display empty cart message
  if (cartProducts.length === 0) {
    return (
      <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SectionHeaders mainHeader="Your cart is empty." />
        </div>
      </div>
    );
  }

  // Render cart and checkout form
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid grid-cols-2 mt-8 gap-8">
        <div>
        {cartProducts.map((product) => (
          <CartProduct
            key={product._id} // Use a unique key for each product
            product={product}
            onRemove={() => removeCartProduct(product._id)} // Pass product ID to remove function
          />
        ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>
            <span className="font-semibold pl-2 text-right">
              ${subtotal} <br />
              $5 <br />${subtotal + 5}
            </span>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs addressProps={address} setAddressProp={handleAddressChange} />
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Pay ${subtotal + 5}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
