"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const [activePage, setActivePage] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo with green accent */}
          <Link href="/" className="flex-shrink-0">
            <h2 className="text-blue-950 font-bold text-xl">
              Loga<span style={{color: '#89e101'}}>XP</span>
            </h2>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className={`text-base font-medium transition-all duration-300 relative group ${
                  activePage === "Home" 
                    ? "text-blue-950" 
                    : "text-gray-700 hover:text-blue-950"
                }`}
                onClick={() => setActivePage("Home")}
              >
                Home
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 transition-transform duration-300 ${
                  activePage === "Home" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} style={{backgroundColor: '#89e101'}}></span>
              </Link>
              
              <Link
                href="/blog"
                className={`text-base font-medium transition-all duration-300 relative group ${
                  activePage === "Blogs" 
                    ? "text-blue-950" 
                    : "text-gray-700 hover:text-blue-950"
                }`}
                onClick={() => setActivePage("Blogs")}
              >
               Latest Blog
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 transition-transform duration-300 ${
                  activePage === "Blogs" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} style={{backgroundColor: '#89e101'}}></span>
              </Link>
            </div>
            
            {/* Search Bar with green focus ring */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px #89e101`}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
            
            {/* Login Button with green background */}
            <Link href="/auth/login">
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
                style={{backgroundColor: '#89e101'}}
              >
                <FaUser className="w-4 h-4 mr-2" />
                Login
              </button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-950 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            <Link
              href="/"
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                activePage === "Home"
                  ? "text-blue-950"
                  : "text-gray-700 hover:text-blue-950 hover:bg-gray-50"
              }`}
              style={activePage === "Home" ? {backgroundColor: '#89e10120'} : {}}
              onClick={() => {
                setActivePage("Home");
                setIsMenuOpen(false);
              }}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                activePage === "Blogs"
                  ? "text-blue-950"
                  : "text-gray-700 hover:text-blue-950 hover:bg-gray-50"
              }`}
              style={activePage === "Blogs" ? {backgroundColor: '#89e10120'} : {}}
              onClick={() => {
                setActivePage("Blogs");
                setIsMenuOpen(false);
              }}
            >
              Latest Blog
            </Link>
            
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent bg-gray-50"
                  onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px #89e101`}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
              </div>
            </div>
            
            {/* Mobile Login Button */}
            <div className="px-3 py-2">
              <Link href="/auth/login">
                <button
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white hover:opacity-90 transition-colors duration-200"
                  style={{ backgroundColor: "#89e101" }}
                >
                  <FaUser className="w-4 h-4 mr-2" />
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;