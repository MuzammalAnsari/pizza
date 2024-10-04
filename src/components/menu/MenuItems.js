import { useContext, useState } from "react";
import { cartContext } from "../AppContext";
import MenuItemBox from "./menuItemBox";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientsPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(cartContext);

  function handleToAddCartClick() {
    const hasOptions = sizes.length > 0 || extraIngredientsPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => prev.filter((item) => item !== extraThing));
    }
  }

  // Calculate total price
  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    selectedExtras.forEach((extra) => {
      selectedPrice += extra.price;
    });
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white my-8 p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2 rounded-lg"
              style={{ maxHeight: "calc(100vh - 80px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto "
              />
              <p className="text-lg font-semibold text-center">{name}</p>
              <p className="text-gray-500 text-center text-sm mb-2">
                {description}
              </p>

              {/* Size selection */}
              {sizes?.length > 0 && (
                <div className="p-2">
                  <p className="text-lg font-semibold text-gray-700 text-center">
                    Sizes
                  </p>
                  {sizes.map((size) => (
                    <label
                      key={size._id}
                      className="flex items-center mb-1 gap-2 p-2 border rounded-md"
                    >
                      <input
                        onChange={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                        type="radio"
                        name="size"
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}

              {/* Extra ingredients */}
              {extraIngredientsPrices?.length > 0 && (
                <div className="p-2">
                  <p className="text-lg font-semibold text-gray-700 text-center">
                    Any extras?
                  </p>
                  {extraIngredientsPrices.map((extraThings) => (
                    <label
                      key={extraThings._id}
                      className="flex items-center mb-1 gap-2 p-2 border rounded-md"
                    >
                      <input
                        onChange={(ev) =>
                          handleExtraThingClick(ev, extraThings)
                        }
                        type="checkbox"
                        checked={selectedExtras.map((e) => e._id).includes(extraThings._id)}
                        name={extraThings.name}
                      />
                      {extraThings.name} +${extraThings.price}
                    </label>
                  ))}
                </div>
              )}

              <button
                onClick={handleToAddCartClick}
                type="button"
                className="primary sticky bottom-2 mb-1"
              >
                Add to cart ${selectedPrice}
              </button>
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemBox onAddToCart={handleToAddCartClick} {...menuItem} />
    </>
  );
}
