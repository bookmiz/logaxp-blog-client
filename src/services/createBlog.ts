import axios from "axios";

const API_URL = "https://blog-app-1mfc.onrender.com/api/v1/blogs";

export const createBlog = async (blogData: {
  title: string;
  content: string;
  name: string;
  app: string;
  email: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}?app=${blogData.app}`, blogData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating blog:", error.response?.data || error.message);
    throw error;
  }
};
