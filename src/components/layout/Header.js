"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { cartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import Bars2 from "../icons/Bars2";
import './header.css'; // Import the external CSS

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </>
    );
  }
  if (status === "unauthenticated") {
    return (
      <>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </>
    );
  }
}

export default function Header() {
  const { status, data } = useSession();
  const userName = data?.user?.name?.split(" ")[0] || data?.user?.email;
  const { cartProducts } = useContext(cartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  // State to manage the active link
  const [activeLink, setActiveLink] = useState(pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <header className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-1">
      {/* Mobile Header */}
      <div className="flex items-center md:hidden justify-between">
        <Link href="/" className="text-primary font-semibold text-2xl">
          Muzi Food
        </Link>
        <div className="flex gap-8 items-center">
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {status === "authenticated" && cartProducts?.length > 0
                ? cartProducts.length
                : 0}
            </span>
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href="/" onClick={() => handleLinkClick("/")}>Home</Link>
          <Link href="/about" onClick={() => handleLinkClick("/about")}>About</Link>
          <Link href="/contact" onClick={() => handleLinkClick("/contact")}>Contact</Link>
          <AuthLinks status={status} userName={userName} />
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link href="/" className={`text-primary font-semibold text-2xl`}>
            Muzi Food
          </Link>
          <Link href="/" onClick={() => handleLinkClick("/")} className={activeLink === "/" ? "active" : ""}>Home</Link>
          <Link href="/about" onClick={() => handleLinkClick("/about")} className={activeLink === "/about" ? "active" : ""}>About</Link>
          <Link href="/contact" onClick={() => handleLinkClick("/contact")} className={activeLink === "/contact" ? "active" : ""}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
              {status === "authenticated" && cartProducts?.length > 0
                ? cartProducts.length
                : 0}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
