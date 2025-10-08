"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowDown, FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";
import { useBlogs } from "@/hooks/useBlogs"; // <-- Import our hook

// ✅ Define TypeScript interfaces for strong typing
interface BlogUser {
  name?: string;
  profile_image?: string;
}

interface BlogTag {
  name?: string;
}

interface Blog {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  content?: string;
  social_image?: string;
  published_at?: string;
  createdAt?: string;
  external_url?: string;
  name?: string;
  user?: BlogUser;
  tags?: BlogTag[];
}

const BlogGrid = () => {
  const [visiblePosts, setVisiblePosts] = useState(8);
  const { data: blogs = [], isLoading, isError } = useBlogs();

  // ✅ Sort blogs by creation date (newest first)
  const sortedBlogs: Blog[] = [...blogs].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.published_at || 0).getTime();
    const dateB = new Date(b.createdAt || b.published_at || 0).getTime();
    return dateB - dateA;
  });

  // ✅ Static fallback images for blogs
  const fallbackBlogImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=200&fit=crop",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=200&fit=crop",
  ];

  // ✅ Static fallback images for authors
  const fallbackAuthorImages = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b332c913?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face",
  ];

  // ✅ Function to get author image
  const getAuthorImage = (post: Blog, index: number): string => {
    if (
      post.user?.profile_image &&
      post.user.profile_image !== "/default-avatar.png" &&
      !post.user.profile_image.includes("default-avatar")
    ) {
      return post.user.profile_image;
    }
    return fallbackAuthorImages[index % fallbackAuthorImages.length];
  };

  // ✅ Function to get blog banner image
  const getBlogImage = (post: Blog, index: number): string => {
    if (
      post.social_image &&
      post.social_image !== "/default-thumbnail.png" &&
      !post.social_image.includes("default-thumbnail")
    ) {
      return post.social_image;
    }
    return fallbackBlogImages[index % fallbackBlogImages.length];
  };

  // ✅ Loading state
  if (isLoading) {
    return <p className="text-center py-10 text-lg">Loading blogs...</p>;
  }

  // ✅ Error state
  if (isError) {
    return (
      <p className="text-center py-10 text-red-600">
        Failed to fetch blogs 😢
      </p>
    );
  }

  return (
    <div className="w-full min-h-screen">
      <section className="py-16 px-4 max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            All blog posts
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedBlogs.slice(0, visiblePosts).map((post, index) => (
            <motion.article
              key={post._id || post.id || index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 relative"
            >
              {/* Blog Link */}
              <Link href={`/blog/${post._id}`} className="absolute inset-0 z-10" />

              {/* Image Section */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={getBlogImage(post, index)}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.description || post.content?.slice(0, 100) + "..."}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Link
                    href="/authors"
                    className="flex items-center gap-3 relative z-20 hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative w-8 h-8">
                      <Image
                        src={getAuthorImage(post, index)}
                        alt={post.user?.name || "Author"}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm hover:text-blue-900 transition-colors duration-200">
                        {post.user?.name || post.name || "Unknown Author"}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(
                          post.published_at || post.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
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

        {/* Load More Button */}
        {visiblePosts < sortedBlogs.length && (
          <div className="text-center mt-16">
            <motion.button
              onClick={() => setVisiblePosts((prev) => prev + 4)}
              disabled={isLoading}
              className="bg-blue-950 hover:bg-slate-900 text-white font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowDown className="text-sm text-[#89e101]" />
              Load More Articles ({sortedBlogs.length - visiblePosts} remaining)
            </motion.button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogGrid;
