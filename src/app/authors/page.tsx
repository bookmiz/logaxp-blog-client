"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from 'react-icons/fa';

// Mock data for blog posts - matching BlogGrid structure
export const blogPosts = [
  {
    id: 1,
    title: "Our top 10 Javascript frameworks to use",
    description: "JavaScript frameworks make development easy with extensive features and robust community support.",
    social_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    external_url: "https://example.com",
    tag_list: ["JavaScript", "Frameworks", "Development"],
    user: {
      name: "Drew Cano",
      profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
    },
    published_at: "2024-01-13",
  },
  {
    id: 4,
    title: "Building your API Stack",
    description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them effectively.",
    social_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    external_url: "https://example.com",
    tag_list: ["API", "Backend", "Development"],
    user: {
      name: "Lana Steiner",
      profile_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
    },
    published_at: "2024-01-18",
  },
  {
    id: 2,
    title: "UX review presentations",
    description: "How do you create compelling presentations that wow your colleagues and stakeholders with effective design principles.",
    social_image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
    tag_list: ["Design", "UX", "Presentation"],
    user: {
      name: "Olivia Rhye",
      profile_image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    published_at: "2024-01-20",
  },
  {
    id: 3,
    title: "Building your API Stack",
    description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them effectively.",
    social_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    external_url: "https://example.com",
    tag_list: ["API", "Backend", "Development"],
    user: {
      name: "Lana Steiner",
      profile_image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
    },
    published_at: "2024-01-18",
  },
   
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const AuthorSection = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(4);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12 space-y-12 mt-32">
      {/* About Author Section - ORIGINAL */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-36">
        
        {/* Left Section */}
        <div className="w-full">
          <h4 className="text-xs uppercase text-[#89e101] font-semibold tracking-widest">
            About Author
          </h4>
          <h2 className="text-4xl mt-1 text-gray-900">Writer</h2>
          <div className="w-full h-[1px] bg-gray-300 my-4"></div>
          <p className="text-slate-900 leading-relaxed text-lg">
            Passionate about storytelling and the written word, this writer blends creativity with clarity to produce engaging and insightful content. With a love for exploring ideas, they bring fresh perspectives into every piece whether it's fiction, essays, or thought-provoking articles. Their approach combines research, imagination, and an authentic voice that resonates with readers across different backgrounds.
<br />
Beyond writing, the author is deeply curious about human experiences and the ways words can connect people. They see writing not only as a craft but also as a bridge that sparks conversations, inspires change, and leaves a lasting impact. Each work is shaped by a commitment to both meaning and style, creating narratives that inform, entertain, and move the audience.
          </p>
        </div>

        {/* Right Section - Author Card - ORIGINAL */}
        <div className="w-full max-w-[500px] aspect-square relative rounded-lg overflow-hidden shadow-lg border-b border-lime-500 ml-auto">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
            alt="Author"
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
          {/* Blur Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-white/10 backdrop-blur-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-lg font-bold">Adam Wilson</h3>
              <div className="flex space-x-1">
                {Array(5).fill(0).map((_, index) => (
                  <span key={index} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
            </div>
            <p className="text-white text-sm mt-1">Holla</p>
            <p className="text-white text-xs">Writer</p>
          </div>
        </div>
      </div>

      {/* Posts By Author  */}
      <div className="mt-44">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Posts By The Author</h2>
        
        {/* EXACT BlogGrid styling */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogPosts.slice(0, visiblePosts).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 60 }}
              animate={hasLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 relative"
            >
              {/* Main card link - covers entire card except author section */}
              <Link href="/blog" className="absolute inset-0 z-10" />

              {/* Image Section */}
              <div className="relative overflow-hidden">
                <div className="relative w-full h-[200px]">
                  <Image
                    src={post.social_image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Tags overlay */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                    {post.tag_list[0]}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title */}
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors duration-200">
                  {post.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>

          

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {/* Author - clickable to /authors */}
                  <Link 
                    href="/authors" 
                    className="flex items-center gap-3 relative z-20 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={post.user.profile_image}
                        alt={post.user.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm hover:text-blue-900 transition-colors duration-200">
                        {post.user.name}
                      </p>
                      <p className="text-gray-500 text-xs">{formatDate(post.published_at)}</p>
                    </div>
                  </Link>

                  {/* External link indicator */}
                  {post.external_url && (
                    <Link
                      href={post.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-950 transition-colors duration-200 relative z-20 p-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorSection;