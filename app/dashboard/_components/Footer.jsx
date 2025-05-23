"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-6 pb-4 shadow-inner">
      <div className="container mx-auto px-9">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0 max-w-sm">
            <Image src={'/PrepBot_logo.svg'} width={120} height={60} alt='PrepBot logo'/>
            <p className="text-gray-600 mt-4 text-sm">
              PrepBot helps you prepare for interviews, exams, and assessments with AI-powered practice questions and personalized feedback.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/questions" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard/upgrade" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Upgrade
                </Link>
              </li>
              <li>
                {/* <Link href="http://localhost:3000/dashboard/upgradehttps://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Coding Practice
                </Link> */}
                <a 
                   href="https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/"
                   target="_blank"
                   rel="noopener noreferrer"
                  className="hover:text-[#3333ff] hover:font-bold transition-all cursor-pointer text-gray-600 "
          >
            Coding Practice
          </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-[#3333ff] transition-all">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-[#3333ff] transition-all">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#3333ff] transition-all">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-[#3333ff] transition-all">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-2 pt-6 text-center">
          <p className="text-sm text-blue-700">
            <strong>
            © {currentYear} PrepBot. All rights reserved.</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;