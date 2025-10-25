"use client"

import React, { useState } from 'react';
import BlogNavbar from './shared/BlogNavbar';
import AdminDashboard from './admin-dashboard/AdminDashboard';
import CreateBlog from './create/CreateBlog';

const MainBlogApp = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Clear editing blog when switching to posts tab
    if (tab === 'posts') {
      setEditingBlog(null);
    }
  };

  const handleEditBlog = (blog: any) => {
    setEditingBlog(blog);
    setActiveTab('create');
  };

  const clearEditingBlog = () => {
    setEditingBlog(null);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <BlogNavbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        setEditingBlog={setEditingBlog}
      />
      
      {activeTab === 'posts' ? (
        <AdminDashboard 
          setActiveTab={setActiveTab} 
          onEditBlog={handleEditBlog}
        />
      ) : (
        <CreateBlog 
          editingBlog={editingBlog}
          onClearEditing={clearEditingBlog}
        />
      )}
    </div>
  );
};

export default MainBlogApp;