import React, { useState, useRef } from 'react';
import { Save, Loader, Bold, Italic, Underline, List, ListOrdered, Link, Image, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';
import { createBlog } from "@/services/createBlog";

const CreateBlog = () => {
  const [blogPost, setBlogPost] = useState({
    title: '',
    name: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    email: '',
    app: 'myapp1'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setBlogPost(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            execCommand('insertImage', event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleLinkInsert = () => {
    const url = prompt('Enter URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      handleInputChange('content', editorRef.current.innerHTML);
    }
  };

  const handleSave = async (status: string) => {
    if (!blogPost.title.trim() || !blogPost.content.trim() || !blogPost.name.trim() || !blogPost.email.trim()) {
      setMessage('❌ Please fill in all required fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const apiData = {
        title: blogPost.title,
        content: blogPost.content,
        name: blogPost.name,
        email: blogPost.email,
        app: blogPost.app
      };

      const result = await createBlog(apiData);
      
      setMessage(`✅ Blog created successfully!`);
      
      // Clear form after successful creation
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      setBlogPost({
        title: '',
        name: '',
        date: new Date().toISOString().split('T')[0],
        content: '',
        email: '',
        app: 'myapp1'
      });
    } catch (error) {
      console.error('Error creating blog:', error);
      setMessage('❌ Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <style>{`
        .editor-content {
          min-height: 400px;
          max-height: 600px;
          overflow-y: auto;
        }
        .editor-content:focus {
          outline: none;
          border-color: #172554;
          box-shadow: 0 0 0 2px rgba(23, 37, 84, 0.1);
        }
        .editor-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .editor-content p {
          margin-bottom: 1em;
        }
        .editor-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin-bottom: 0.5em;
          margin-top: 0.5em;
        }
        .editor-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 0.5em;
          margin-top: 0.5em;
        }
        .editor-content ul, .editor-content ol {
          margin-left: 2em;
          margin-bottom: 1em;
          padding-left: 0.5em;
        }
        .editor-content ul {
          list-style-type: disc;
        }
        .editor-content ol {
          list-style-type: decimal;
        }
        .editor-content li {
          margin-bottom: 0.25em;
        }
        .editor-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .editor-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1em 0;
          border-radius: 0.5rem;
        }
        .editor-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin-left: 0;
          margin-bottom: 1em;
          color: #6b7280;
          font-style: italic;
        }
        .toolbar-button {
          padding: 0.5rem;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .toolbar-button:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }
        .toolbar-button:active {
          background: #e5e7eb;
        }
        .toolbar-button.active {
          background: #dbeafe;
          border-color: #3b82f6;
        }
        .toolbar-divider {
          width: 1px;
          background: #e5e7eb;
          margin: 0 0.25rem;
          height: 24px;
        }
      `}</style>
      
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create New Blog Post</h2>
        </div>

        <div className="p-6 space-y-8">
          {/* Message Display */}
          {message && (
            <div className={`p-4 rounded-lg ${message.includes('✅') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {message}
            </div>
          )}

          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  type="text"
                  value={blogPost.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="The Impact of Technology on the Workplace..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent text-gray-900"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  value={blogPost.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Author name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent text-gray-900"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={blogPost.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent text-gray-900"
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          {/* Author Information */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Author Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Email *
                </label>
                <input
                  type="email"
                  value={blogPost.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="author@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent text-gray-900"
                  disabled={loading}
                />
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Content Section</h3>
            <div className="border border-gray-200 text-gray-900 rounded-lg overflow-hidden bg-white">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 px-4 pt-4">
                  Content *
                </label>
                
                {/* Toolbar */}
                <div className="px-4 pb-3 flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50">
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('formatBlock', '<h1>')}
                    title="Heading 1"
                  >
                    <Heading1 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('formatBlock', '<h2>')}
                    title="Heading 2"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('formatBlock', '<p>')}
                    title="Normal Text"
                  >
                    <Type className="w-4 h-4" />
                  </button>
                  
                  <div className="toolbar-divider"></div>
                  
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('bold')}
                    title="Bold (Ctrl+B)"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('italic')}
                    title="Italic (Ctrl+I)"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('underline')}
                    title="Underline (Ctrl+U)"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  
                  <div className="toolbar-divider"></div>
                  
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('insertUnorderedList')}
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('insertOrderedList')}
                    title="Numbered List"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  
                  <div className="toolbar-divider"></div>
                  
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('justifyLeft')}
                    title="Align Left"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('justifyCenter')}
                    title="Align Center"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={() => execCommand('justifyRight')}
                    title="Align Right"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                  
                  <div className="toolbar-divider"></div>
                  
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={handleLinkInsert}
                    title="Insert Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={handleImageUpload}
                    title="Insert Image"
                  >
                    <Image className="w-4 h-4" />
                  </button>
                </div>

                {/* Editor */}
                <div
                  ref={editorRef}
                  contentEditable={!loading}
                  className="editor-content px-4 py-3 text-gray-900 bg-white border-0"
                  onInput={handleContentChange}
                  data-placeholder="Start writing your blog post... Use the toolbar above to format text and add images."
                  suppressContentEditableWarning
                />
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex items-center justify-end pt-6 border-t">
            <button
              onClick={() => handleSave('Published')}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading ? 'Creating Blog...' : 'Create Blog'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;