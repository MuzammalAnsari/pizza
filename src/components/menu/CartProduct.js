import Image from "next/image";
import { cartProductPrice } from "../AppContext";
import Trash from "../icons/trash";

export default function CartProduct({ product, onRemove }) {
  return (
    <div className="flex gap-4 mb-2 border-b py-2 items-center">
      <div className="w-24">
        <Image src={product.image} alt="pizza" width={240} height={240} />
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
      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button
            onClick={() => {
                if (onRemove) onRemove(index);
            }}
            type="button"
            className="p-2"
          >
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
