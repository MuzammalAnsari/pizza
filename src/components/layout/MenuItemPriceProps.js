import Trash from "../icons/trash";
import Plus from "../icons/Plus";

export default function MenuItemPriceProps({name, props, setProps, addLabel}){

//addSize
  function addProps() {
    setProps((oldSizes) => {
      return [...oldSizes, { name: "", price: 0 }];
    });
  }

  //editSizes
  function editProps(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  //removeSize
  function removeProp(indexToRemove) {
    setProps((oldProps) => {
      return oldProps.filter((v, index) => index !== indexToRemove);
    });
  }
    return (
        <div className="bg-gray-300 p-2 rounded-md mb-2">
            <div>
            <h3 className="text-gray-700">{name}:</h3>
            </div>
            {props?.length > 0 && props.map((size, index) => (
                <div className="flex items-end gap-2">
                  <div>
                    <label> Name:</label>
                    <input
                      type="text"
                      value={size.name}
                      onChange={(ev) => editProps(ev, index, "name")}
                      placeholder="Size name"
                    />
                  </div>
                  <div>
                    <label>Extra Price:</label>
                    <input
                      type="text"
                      value={size.price}
                      onChange={(ev) => editProps(ev, index, "price")}
                      placeholder="Extra prize"
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => removeProp(index)}
                      type="button"
                      className="bg-white mb-2 px-2"
                    >
                      <Trash/>
                    </button>
                  </div>
                </div>
              ))}
            <button type="button" onClick={addProps} className="bg-white items-center">
                <Plus className="w-4 h-4"/>
              <span>{addLabel}</span>
            </button>
          </div>
    )
}