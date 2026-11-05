import Image from "next/image";
import Link from "next/link";
import ButtonHighlight from "./buttonHighlight";
import NavbarCounts from "./navbarCounts";
import { Suspense } from "react";

const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#0E1014] shadow-sm">
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-1 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <Suspense fallback={<li>Loading...</li>}>
                <ButtonHighlight />
              </Suspense>
            </ul>
          </div>

          {/* Logo */}
          <Link href="/" className="btn btn-ghost text-xl font-bold text-white">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            FITLOG
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center gap-2 px-1">
            <Suspense fallback={<li>Loading...</li>}>
              <ButtonHighlight />
            </Suspense>
          </ul>
        </div>

        {/* Navbar End - Live Counters */}
        <NavbarCounts />
      </div>
    </div>
  );
};

export default NavBar;
