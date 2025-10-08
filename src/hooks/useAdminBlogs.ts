import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://blog-app-1mfc.onrender.com/api/v1/blogs";

export function useAdminBlogs() {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}?app=myapp1`);
      return response.data; // API returns blogs here
    },
  });
}
