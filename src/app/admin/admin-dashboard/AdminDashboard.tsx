"use client";

import React, { useState } from "react";
import { Plus, Edit3, Trash2, Calendar } from "lucide-react";
import { useAdminBlogs } from "@/hooks/useAdminBlogs";
import { useEditBlog } from "@/hooks/useEditBlog";
import { useDeleteBlog } from "@/hooks/useDeleteBlog";
import EditBlogModal from "./../EditBlogModal";

interface AdminDashboardProps {
  setActiveTab: (tab: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveTab }) => {
  const { data: blogs = [], isLoading, isError } = useAdminBlogs();
  const editBlog = useEditBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort blogs by creation date (newest first)
  const sortedBlogs = [...blogs].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleEdit = (post: any) => {
    setSelectedBlog(post);
    setIsModalOpen(true);
  };

  const handleSave = (updatedData: any) => {
    editBlog.mutate(
      {
        ...updatedData,
        app: "myapp1", // ✅ include app in body
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      deleteBlog(id);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950"></div>
            <p className="ml-3 text-gray-600 text-lg">Loading your blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <p className="text-center text-red-600 text-lg">Failed to fetch blogs. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 m">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Management</h2>
              <p className="text-gray-600">Manage all your blog posts in one place</p>
            </div>
            <button
              onClick={() => setActiveTab("create")}
              className="flex items-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-xl  transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <Plus className="w-5 h-5" />
              Create New Post
            </button>
          </div>
        </div>

        {/* Blog Table */}
        <div className="overflow-x-auto">
          {sortedBlogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first blog post!</p>
              <button
                onClick={() => setActiveTab("create")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Create First Post
              </button>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date Created</th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sortedBlogs.map((post: any) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="text-md font-medium text-gray-700 line-clamp-2">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm text-gray-700 font-medium">
                        {post.name || "Unknown Author"}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEdit(post)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-950 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 border border-blue-200"
                          title="Edit Blog"
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all duration-200 border border-red-200"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer with stats */}
        {sortedBlogs.length > 0 && (
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <p className="text-sm text-gray-600">
              Total posts: <span className="font-semibold text-gray-900">{sortedBlogs.length}</span>
            </p>
          </div>
        )}
      </div>

      {/* Edit Blog Modal */}
      {selectedBlog && (
        <EditBlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          blog={selectedBlog}
          onSave={handleSave}
          isLoading={editBlog.isPending}
        />
      )}
    </div>
  );
};

export default AdminDashboard;