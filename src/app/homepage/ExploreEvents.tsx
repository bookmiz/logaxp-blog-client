"use client";

import Image from "next/image";
import Link from "next/link";
import { useBlogs } from "@/hooks/useBlogs";

// ✅ Define proper Blog types
interface BlogUser {
  name?: string;
  profile_image?: string;
}

interface BlogTag {
  name?: string;
}

interface Blog {
  _id: string;
  title: string;
  social_image?: string;
  published_at?: string;
  created_at?: string;
  name?: string;
  user?: BlogUser;
  tags?: BlogTag[];
}

const BlogCard = () => {
  const { data: blogs = [], isLoading, isError } = useBlogs();

  // Static fallback images for blog
  const fallbackBlogImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1250&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1250&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1250&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1250&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1250&h=400&fit=crop",
  ];

  // Static fallback images for authors
  const fallbackAuthorImages = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  ];

  // Get the first blog post
  const featuredBlog: Blog | undefined = blogs[0];

  // ✅ Function to get fallback author image
  const getAuthorImage = (post: Blog) => {
    if (
      post?.user?.profile_image &&
      post.user.profile_image !== "/default-avatar.png" &&
      !post.user.profile_image.includes("default-avatar")
    ) {
      return post.user.profile_image;
    }
    return fallbackAuthorImages[0];
  };

  // ✅ Function to get blog banner image
  const getBlogImage = (post: Blog) => {
    if (
      post?.social_image &&
      post.social_image !== "/default-thumbnail.png" &&
      !post.social_image.includes("default-thumbnail")
    ) {
      return post.social_image;
    }
    return fallbackBlogImages[0];
  };

  // ✅ Function to extract category from tags or content
  const getCategory = (post: Blog) => {
    if (post?.tags && post.tags.length > 0) {
      return post.tags[0].name || "Technology";
    }
    return "Technology";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-52 bg-white p-4">
        <div className="w-full max-w-[1250px]">
          <div className="bg-gray-200 animate-pulse rounded-2xl h-60 md:h-80 lg:h-96"></div>
          <p className="text-center py-4 text-lg text-gray-600">
            Loading featured blog...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !featuredBlog) {
    return (
      <div className="flex justify-center items-center pt-52 bg-white p-4">
        <div className="w-full max-w-[1250px]">
          <p className="text-center py-10 text-red-600">
            Failed to load featured blog 😢
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center pt-52 bg-white p-4">
      <Link href={`/blog/${featuredBlog._id}`} className="w-full max-w-[1250px]">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full group">
          {/* Image with Overlay */}
          <div className="relative w-full h-60 md:h-80 lg:h-96">
            <Image
              src={getBlogImage(featuredBlog)}
              alt={featuredBlog.title}
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl group-hover:bg-opacity-50 transition-all duration-300"></div>

            {/* Text Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              {/* Category Tag */}
              <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                {getCategory(featuredBlog)}
              </span>

              {/* Title */}
              <h2 className="text-lg md:text-2xl font-semibold leading-tight group-hover:text-yellow-200 transition-colors duration-300">
                {featuredBlog.title}
              </h2>

              {/* Author & Date */}
              <div className="flex items-center gap-3 mt-3 text-gray-300 text-sm">
                <Image
                  src={getAuthorImage(featuredBlog)}
                  alt={
                    featuredBlog.user?.name ||
                    featuredBlog.name ||
                    "Author"
                  }
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span>
                  {featuredBlog.name ||
                    featuredBlog.user?.name ||
                    "Unknown Author"}
                </span>
                <span>•</span>
                <span>
                  {new Date(
                    featuredBlog.published_at ||
                      featuredBlog.created_at ||
                      Date.now()
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
