"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname(); // ✅ Get current pathname

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md">
      <Image src="/PrepBot_logo.svg" width={160} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li>
          <Link 
            href="/dashboard"
            className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer ${path === "/dashboard" ? "text-[#3333ff] font-bold" : ""}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/questions"
            className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer ${path === "/dashboard/questions" ? "text-[#3333ff] font-bold" : ""}`}
          >
            Questions
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/upgrade"
            className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer ${path === "/dashboard/upgrade" ? "text-[#3333ff] font-bold" : ""}`}
          >
            Upgrade
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard/how"
            className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer ${path === "/dashboard/how" ? "text-[#3333ff] font-bold" : ""}`}
          >
            How it works
          </Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
