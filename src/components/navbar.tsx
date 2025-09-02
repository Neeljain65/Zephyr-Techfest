"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-black/50 backdrop-blur absolute top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">Z</div>
              <span className="font-mono text-sm text-white">Zephyr</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-mono text-sm text-white/90 hover:text-white">Home</Link>
            <Link href="/zephyr-events" className="font-mono text-sm text-white/90 hover:text-white">Events</Link>

            <Link href="#About" className="font-mono text-sm text-white/90 hover:text-white">About</Link>
            <Link href="#Contact" className="font-mono text-sm text-white/90 hover:text-white">Contact</Link>
          </nav>

          <div className="flex items-center md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {open ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"} border-t border-white/5 bg-black/50`}>
        <div className="px-4 pt-2 pb-4 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md text-base font-mono text-white/90 hover:bg-white/5">Home</Link>
          <Link href="/zephyr-events" className="block px-3 py-2 rounded-md text-base font-mono text-white/90 hover:bg-white/5">Events</Link>
          <Link href="/schedule" className="block px-3 py-2 rounded-md text-base font-mono text-white/90 hover:bg-white/5">Schedule</Link>
          <Link href="/about" className="block px-3 py-2 rounded-md text-base font-mono text-white/90 hover:bg-white/5">About</Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-mono text-white/90 hover:bg-white/5">Contact</Link>
        </div>
      </div>
    </header>
  );
}
