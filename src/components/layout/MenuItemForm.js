import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({onSubmit, menuItem}) {
    const [image, setImage] = useState(menuItem?.image || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');

    return (
        <form 
        onSubmit={ev => onSubmit(ev, {image, name, description, basePrice})}
         className="mt-8 ">
        <div
          className="flex items-start gap-4"
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

            <label>Base Price</label>
            <input
              type="text"
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    )
}
