"use client";

import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { cartContext, cartProductPrice } from "../../components/AppContext";
import Image from "next/image";
import Trash from "../../components/icons/trash";
import AddressInputs from "../../components/layout/AddressInputs";
import { useProfile } from "../../components/layout/useProfile";

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(cartContext);
  const [address, setAddress] = useState({});
  const { data: loggedInUserData } = useProfile();

  useEffect(() => {
    if (loggedInUserData?.city) {
      const { phone, streetAddress, city, postalCode, country } = loggedInUserData;
      const addressFromProfile = { phone, streetAddress, city, postalCode, country };
      setAddress(addressFromProfile);
    }
  }, [loggedInUserData]);

  function handleAddressChange() {
    setAddress((prev) => ({ ...prev, [propName]: value }));
  }

  let total = 0;
  for (const p in cartProducts) {
    total += cartProductPrice(cartProducts[p]);
  }

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid grid-cols-2 mt-8 gap-8">
        <div>
          {cartProducts?.length === 0 && (
            <div className="text-center">Cart is empty</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex gap-4 mb-2 border-b py-2 items-center">
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt="pizza"
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-700">
                      <p>Size: {product.size.name}</p>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                      {product.extras.map((extra) => (
                        <div>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    onClick={() => {
                      removeCartProduct(index);
                    }}
                    type="button"
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="text-lg font-semibold pl-2">${total}</span>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />

            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
