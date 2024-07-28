"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { cartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";

export default function Header() {
  const session = useSession();
  // console.log(session)
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(cartContext);
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header className="flex items-center justify-between">
      <Link className="text-primary font-semibold text-2xl" href={"/"}>
        {" "}
        ST PIZZA
      </Link>
      <nav className="flex gap-4 items-center text-gray-500 font-semibold">
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/#about"}>About</Link>
        <Link href={"/#contact"}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"}>
              Hello,
              {userName}
            </Link>
            <button
              onClick={() => signOut()}
              href={"/register"}
              className="bg-primary rounded-full px-8 text-white py-2 "
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"} className="px-8  py-2 ">
              Login
            </Link>
            <Link
              href={"/register"}
              className="bg-primary rounded-full px-8 text-white py-2 "
            >
              Register
            </Link>
          </>
        )}
        <Link href={"/cart"} className="relative">
          <ShoppingCart />
          <span className="absolute -top-3 -right-3 p-1 leading-3 bg-primary text-white text-xs rounded-full">{cartProducts.length}</span>
        </Link>
      </nav>
    </header>
  );
}
