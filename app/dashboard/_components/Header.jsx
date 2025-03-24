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
            Courses
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
          <a 
            href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer"
          >
            Coding Practice
          </a>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
