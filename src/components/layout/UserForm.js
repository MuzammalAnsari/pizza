import { useState } from "react";
import EditableImage from "./EditableImage";
import { useProfile } from "./useProfile";

function UserForm({ user = {}, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();

  
  return (
    <div className="flex gap-4 ">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            admin,
            image,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
          })
        }
      >
        <label>First and Last Name:</label>
        <input
          type="text"
          placeholder="First and Last Name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          disabled={true}
          value={user.email || ""}
          placeholder={"email"}
        />
        <label>Phone:</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
        />

        <label>Address:</label>
        <input
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(ev) => setStreetAddress(ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Postal Code:</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(ev) => setPostalCode(ev.target.value)}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
          </div>
        </div>
        <label>Country:</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(ev) => setCountry(ev.target.value)}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              htmlFor="adminCb"
              className="inline-flex items-center gap-2 p-2 mb-2"
            >
              <input
                type="checkbox"
                id="adminCb"
                checked={admin}
                value={"1"}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserForm;
