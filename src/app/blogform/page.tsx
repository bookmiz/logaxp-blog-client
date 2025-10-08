"use client";

import { useState } from "react";
import { createBlog } from "@/services/createBlog";

export default function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    name: "",
    app: "myapp1",
    email: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createBlog(formData);
      setMessage("✅ Blog created successfully!");
      setFormData({ title: "", content: "", name: "", app: "myapp1", email: "" });
    } catch {
      setMessage("❌ Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg mt-60">
      <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>

      <input
        type="text"
        name="title"
        placeholder="Blog Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <textarea
        name="content"
        placeholder="Blog Content"
        value={formData.content}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Author Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Author Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Create Blog"}
      </button>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </form>
  );
}
