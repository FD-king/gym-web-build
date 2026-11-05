"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ButtonHighlight = () => {
  const pathname = usePathname();

  const links = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`rounded-full px-5 py-2 transition-all duration-200 ${
                isActive
                  ? "bg-[#1D2A0D] font-semibold text-[#C2F800]"
                  : "text-[#9299A5] hover:bg-[#1D2A0D] hover:text-[#C2F800]"
              }`}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default ButtonHighlight;
