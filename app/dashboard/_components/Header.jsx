"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from "next/navigation"; // ✅ Import usePathname

function Header(){
    const path = usePathname(); // ✅ Get current pathname

  useEffect(() => {
    console.log(path); // ✅ Log current path
  }, [path]); 

    return (<div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
        <Image src={'/PrepBot_logo.svg'} width={160} height={100} alt='logo'></Image>
        <ul className='hidden md:flex gap-6'>
            <li className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard' && 'text-[#3333ff] font-bold'}`}>Dashboard</li>
            <li className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/questions' && 'text-[#3333ff] font-bold'}`}> Question</li>
            <li className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/upgrade' && 'text-[#3333ff] font-bold'}`}>Upgrade</li>
            <li className={`hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer 
                ${path=='/dashboard/how' && 'text-[#3333ff] font-bold'}`}>How it works</li>
        </ul>
        <UserButton/>
    </div>)
}
export default Header;