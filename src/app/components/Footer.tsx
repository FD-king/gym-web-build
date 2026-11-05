"use client";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-[#0E1014]">
      <footer className="footer sm:footer-horizontal footer-center  text-base-content p-4 flex justify-between items-center gap-2 container mx-auto">
        <div>
          <a className="flex justify-center items-center gap-1 font-bold text-white">
            <Image src="/logo.png" alt="Logo" width={28} height={28} />
            FITLOG
          </a>
        </div>
        <aside>
          <p className=" text-[#8A92A0]">
            © {new Date().getFullYear()} FitLog — Workout Library. Train hard,
            log honest.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
