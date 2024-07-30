"use client";

import { useContext } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import { cartContext } from "../../components/AppContext";
import Image from "next/image";

export default function CartPage() {
  const { cartProducts } = useContext(cartContext);
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid grid-cols-2 mt-4 gap-4">
        <div>
          {cartProducts?.length === 0 && (
            <div className="text-center">Cart is empty</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product) => (
              <div className="flex gap-4 mb-2 border-b py-2 items-center">
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt="pizza"
                    width={240}
                    height={240}
                  />
                </div>
                <div>
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
                <div className="">12</div>
              </div>
            ))}
        </div>
        <div>Right</div>
      </div>
    </section>
  );
}
