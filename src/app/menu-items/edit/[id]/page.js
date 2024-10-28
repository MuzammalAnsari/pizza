"use client";

import Link from "next/link";
import UserTabs from "../../../../components/layout/userTabs";
import toast from "react-hot-toast";
import Left from "../../../../components/icons/Left";
import DeleteButton from "../../../../components/DeleteButton";
import { useEffect, useState } from "react";
import { redirect, useParams } from "next/navigation";
import { useProfile } from "../../../../components/layout/useProfile";
import MenuItemForm from "../../../../components/layout/MenuItemForm";
import Loader from "../../../../components/loader/Loader";

export default function EditMenuItemPage() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items/").then((response) => {
      response.json().then((items) => {
        const item = items.find((i) => i._id === id);
        // console.log(item);
        setMenuItem(item);
      });
    });
  }, []);

  //async handleFormSubmit function
  async function handleFormSubmit(e, data) {
    e.preventDefault();

    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
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

  //handle delete item
  async function handleDelete() {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items?_id=" + id, {
        method: "DELETE",
        body: JSON.stringify({ _id: id }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletingPromise, {
      loading: "Deleting this Item",
      success: "Item Deleted",
      error: "Error",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return (
      <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <Loader />
      </div>
    )
  }

  if (!data.admin) {
    return "Not an Admin";
  }
  return (
    <section className=" max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link href="/menu-items" className="button">
          Show all menu items
          <Left />
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
      <div className="max-w-md mx-auto mt-4">
        <div className="max-w-xs ml-auto pl-10">
          <DeleteButton
           label="Delete this item"
           onDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
}
