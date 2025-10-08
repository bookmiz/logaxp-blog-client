"use client"

import React, { useState } from 'react';
import BlogNavbar from './shared/BlogNavbar';
import AdminDashboard from './admin-dashboard/AdminDashboard';
import CreateBlog from './create/CreateBlog';

const MainBlogApp = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="min-h-screen bg-transparent">
      <BlogNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'posts' ? (
        <AdminDashboard setActiveTab={setActiveTab} />
      ) : (
        <CreateBlog />
      )}
    </div>
  );
};

export default MainBlogApp;