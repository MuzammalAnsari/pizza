"use client";

import Image from "next/image";
import MenuItem from "../menu/MenuItems";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(0, 3));
      });
    });
  }, []);
  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] -z-10 text-left">
          <Image
            src="/sallad1.png"
            width={107}
            height={195}
            alt="salad"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="h-48  absolute right-0 -top-24 -z-10">
          <Image
            src="/sallad2.png"
            width={107}
            height={195}
            alt="salad"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => {
            return <MenuItem {...item} key={item._id} />;
          })}
      </div>
    </section>
  );
}
