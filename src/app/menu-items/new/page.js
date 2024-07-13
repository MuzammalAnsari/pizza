"use client";
import EditableImage from "../../../components/layout/EditableImage";
import toast from "react-hot-toast";
import { useState } from "react";
import UserTabs from "../../../components/layout/userTabs";
import { useProfile } from "../../../components/layout/useProfile";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import { redirect } from "next/navigation";

export default function NewMenuItemPage() {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  //async handleFormSubmit function
  async function handleFormSubmit(e) {
    e.preventDefault();

    //call api with image, name, description, baseprice
    const data = { image, name, description, basePrice };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty Item",
      success: "Item Saved",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Loading User Info....";
  }

  if (!data.admin) {
    return "Not an Admin";
  }

  return (
    <section className=" max-w-md mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link href="/menu-items" className="button">
          Show all menu items
          <Left />
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8 ">
        <div
          className="flex items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
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
    </section>
  );
}
