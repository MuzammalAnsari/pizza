"use client";

import { useState } from "react";
import { useEffect } from "react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import MenuItems from "../../components/menu/MenuItems";

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch("api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });

    fetch("api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c.id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 mb-12 align-middle">
              {menuItems
                .filter(item => item.category === c._id)
                .map(item => (
                  <div key={item.id}>
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
