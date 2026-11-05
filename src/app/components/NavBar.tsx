import Image from "next/image";
import Link from "next/link";
import ButtonHighlight from "./buttonHighlight";
import NavbarCounts from "./navbarCounts";
import { Suspense } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#0E1014] shadow-sm">
      <div className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white hover:bg-[#252A34] lg:hidden"
              aria-label="Open navigation menu"
            >
              <HiOutlineMenuAlt1 size={25} className="text-white" />
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-1 mt-3 w-52 rounded-box bg-[#15171D] p-2 text-white shadow"
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
