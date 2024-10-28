"use client";

import { useState, useEffect } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import MenuItems from "../../components/menu/MenuItems";
import Loader from "../../components/loader/Loader";

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, menuItemsRes] = await Promise.all([
          fetch("api/categories"),
          fetch("api/menu-items"),
        ]);

        const categories = await categoriesRes.json();
        const menuItems = await menuItemsRes.json();

        setCategories(categories);
        setMenuItems(menuItems);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
        <Loader />
      </div>
    )
  }

  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 mb-12 align-middle">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <div key={item._id}>
                    <MenuItems {...item} />
                  </div>
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}

export default MenuPage;
