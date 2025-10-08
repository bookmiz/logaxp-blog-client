import React from 'react';
import { Edit3 } from 'lucide-react';

interface BlogNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BlogNavbar: React.FC<BlogNavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-gradient-to-r from-slate-50 to-slate-100 shadow-lg border-b border-slate-200 pt-44">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Blog Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">Create and manage your blog content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'posts' 
                  ? 'bg-blue-950 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'
              }`}
            >
              All Posts
            </button>
            <button 
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'create' 
                  ? 'bg-blue-950 text-white shadow-lg transform scale-105' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'
              }`}
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogNavbar;