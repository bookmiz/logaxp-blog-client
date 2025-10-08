"use client";

import React from "react";
import Link from "next/link";
import { FaRegEnvelope, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 w-full text-white relative overflow-hidden">
      {/* Decorative background elements */}
      
     
      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
            
              <h2 className="text-2xl font-bold text-white">
                Loga<span style={{color: '#89e101'}}>XP</span>
              </h2>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-sm">
              Crafting exceptional digital experiences that inspire creativity and bring more joy to the world.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
                { icon: FaInstagram, href: "#", label: "Instagram" }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#89e101'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(30, 41, 59, 0.5)'}
                  aria-label={label}
                >
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Navigation
              <div className="absolute bottom-0 left-0 w-8 h-0.5 rounded-full" style={{backgroundColor: '#89e101'}}></div>
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blogs" },
                { label: "Single Post", href: "/single-post" },
                { label: "About Us", href: "/about" }
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link 
                    href={href} 
                    className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px transition-all duration-300 mr-0 group-hover:mr-3" style={{backgroundColor: '#89e101'}}></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Resources
              <div className="absolute bottom-0 left-0 w-8 h-0.5 rounded-full" style={{backgroundColor: '#89e101'}}></div>
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Documentation", href: "#" },
                { label: "Help Center", href: "#" },
                { label: "Community", href: "#" },
                { label: "Support", href: "#" }
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link 
                    href={href} 
                    className="text-slate-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px transition-all duration-300 mr-0 group-hover:mr-3" style={{backgroundColor: '#89e101'}}></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative">
              Stay Updated
              <div className="absolute bottom-0 left-0 w-8 h-0.5 rounded-full" style={{backgroundColor: '#89e101'}}></div>
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Subscribe to our newsletter for the latest updates, tips, and exclusive content.
            </p>
            
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 pr-12"
                  onFocus={(e) => e.currentTarget.style.boxShadow = `0 0 0 2px #89e101`}
                  onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
                />
                <FaRegEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
              
              <button 
                className="w-full text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] hover:opacity-90"
                style={{backgroundColor: '#89e101', boxShadow: '0 10px 25px rgba(137, 225, 1, 0.25)'}}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 15px 30px rgba(137, 225, 1, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(137, 225, 1, 0.25)'}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 LogaXP. All rights reserved. Made with <span style={{color: '#89e101'}}>❤️</span> for creators.
            </p>
            
            <div className="flex items-center space-x-6 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" }
              ].map(({ label, href }, index, array) => (
                <React.Fragment key={label}>
                  <Link 
                    href={href} 
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#89e101'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = ''}
                  >
                    {label}
                  </Link>
                  {index < array.length - 1 && (
                    <span className="text-slate-600">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;