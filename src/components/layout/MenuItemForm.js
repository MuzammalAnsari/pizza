import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(menuItem?.category || "");
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState(
    menuItem?.extraIngredientsPrices || []
  );

  
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);


  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientsPrices,
          category,
        })
      }
      className="mt-8 "
    >
      <div
        className="md:grid items-start gap-4"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="max-w-[150px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow ">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 && categories.map(c=>(
              <option value={c._id}>{c.name}</option>
            ))}
          </select>
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add Item Size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Extra Ingredients"}
            addLabel={"Add ingredients Prices"}
            props={extraIngredientsPrices}
            setProps={setExtraIngredientsPrices}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
