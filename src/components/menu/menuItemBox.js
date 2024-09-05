import React from "react";

function menuItemBox({onAddToCart, ...item}) {
    const { image, name, description, basePrice, sizes, extraIngredientsPrices } = item;
    const hasSizesOrExtras = sizes?.length > 0 || extraIngredientsPrices?.length > 0
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md duration-300 hover:shadow-black/25">
      <div className="text-center">
        <img
          src={image}
          alt={name}
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <button
        type="button"
        onClick={onAddToCart}
        className="bg-primary mt-4 rounded-full text-white px-8 py-2"
      >
        {(hasSizesOrExtras) ? (
          <span>Add to cart (From ${basePrice})</span>
        ) : (
          <span>Add to cart ${basePrice}</span>
        )}
      </button>
    </div>
  );
}

export default menuItemBox;
