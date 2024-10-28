"use client";
import EditableImage from "../../../components/layout/EditableImage";
import toast from "react-hot-toast";
import { useState } from "react";
import UserTabs from "../../../components/layout/userTabs";
import { useProfile } from "../../../components/layout/useProfile";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import Loader from "../../../components/loader/Loader";


export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  //async handleFormSubmit function
  async function handleFormSubmit(e, data) {
    e.preventDefault();

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
    return (
      // <div>loading...</div>
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
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
