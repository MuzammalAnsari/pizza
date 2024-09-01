"use client";
import Link from "next/link";
import { useProfile } from "../../components/layout/useProfile";
import UserTabs from "../../components/layout/userTabs";
import Right from "../../components/icons/Right";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an Admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="flex flex-col items-center mt-8">
        <Link className="button" href="/menu-items/new">
          Create New Menu Item
          <Right />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit Menu Items:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-300 rounded-lg p-4"
              >
                <div className="relative max-w-[150px]">
                  <Image src={item.image} className="rounded-md" width={200} height={200} />
                </div>
                <div className="text-center text-gray-500">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
