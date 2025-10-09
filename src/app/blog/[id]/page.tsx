"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useAddComment } from "@/hooks/useAddComment";
import DOMPurify from "dompurify";

const API_URL = "https://blog-app-1mfc.onrender.com/api/v1/blogs";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  const addComment = useAddComment();

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}?app=myapp1`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data);
        setComments(data.comments || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addComment.mutate(
      {
        id: id as string,
        commentData: {
          name: "Anonymous User",
          email: "anonymous@example.com",
          content: comment,
        },
      },
      {
        onSuccess: (res) => {
          const newComment = res?.comments?.slice(-1)[0];
          if (newComment) {
            setComments((prev) => [newComment, ...prev]);
          }
          setComment("");
        },
      }
    );
  };

  const copyToClipboard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToSocial = (platform: string) => {
    const currentUrl = window.location.href;
    const title = blog?.title || 'Check out this blog post';
    const text = `${title} - ${currentUrl}`;

    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // Sanitize HTML content
  const createMarkup = (htmlContent: string) => {
    return {
      __html: DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'img'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class']
      })
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-950 border-t-lime-400 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-blue-950">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load blog</p>
          <p className="text-gray-500 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="flex justify-center items-center pt-32 bg-white p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[1150px]">
          <div className="relative w-full h-60 md:h-80 lg:h-96">
            <Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Article content"
              fill
              className="object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-lime-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                Article
              </span>

              <h1 className="text-lg md:text-2xl font-semibold leading-tight mb-3">
                {blog.title}
              </h1>

              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                  alt={blog.name}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
                <span>{blog.name}</span>
                <span>•</span>
                <span>{blog.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1150px] mx-auto px-6 md:px-8 py-12">
        <div className="text-gray-600 text-sm mb-8 italic leading-relaxed">
          Welcome to this comprehensive article. Below you'll find detailed insights and information on the topic.
        </div>

        {/* Article Content with DOMPurify */}
        <section className="mb-12">
          <h2 className="text-slate-950 text-2xl mb-4 font-bold">{blog.title}</h2>

          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={createMarkup(blog.content)}
          />
        </section>

        {/* Featured Image Section */}
        <section className="mb-12">
          <div className="relative w-full h-60 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Supporting content image"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Supporting image for the article content
          </p>
        </section>

        {/* Share Actions */}
        <div className="mb-12">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Share this article</h3>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>

            <button 
              onClick={() => shareToSocial('facebook')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>

            <button 
              onClick={() => shareToSocial('twitter')}
              className="px-4 py-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </button>

            <button 
              onClick={() => shareToSocial('linkedin')}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>

            <button 
              onClick={() => shareToSocial('whatsapp')}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
          
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="mb-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this article..."
                className="w-full p-4 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 outline-none resize-vertical min-h-24"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-lime-400 hover:bg-lime-500 text-blue-950 font-medium rounded-lg transition-colors"
              disabled={!comment.trim() || addComment.isPending}
            >
              {addComment.isPending ? "Posting..." : "Post Comment"}
            </button>
          </form>

          <div className="space-y-6">
            {comments.filter((c) => c.email !== blog.email).length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments
                .filter((c) => c.email !== blog.email)
                .map((c) => (
                  <div
                    key={c._id || c.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-lime-400 rounded-full flex items-center justify-center">
                        <span className="text-blue-950 font-medium text-sm">
                          {(c.name || "Anonymous").charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">
                            {c.name || "Anonymous"}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {c.createdAt
                              ? new Date(c.createdAt).toLocaleString()
                              : new Date().toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {c.content || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}