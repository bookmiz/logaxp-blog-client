import axios from "axios";

const API_URL = "https://blog-app-1mfc.onrender.com/api/v1/blogs";

// Fetch blogs with app query
export const fetchBlogs = async () => {
  const response = await axios.get(`${API_URL}?app=myapp1`);
  return response.data;
};



export const deleteBlog = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting blog:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete blog");
  }
};