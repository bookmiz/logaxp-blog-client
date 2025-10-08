import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://blog-app-1mfc.onrender.com/api/v1/blogs";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${API_URL}/${id}?app=myapp1`);
      return response.data;
    },
    onSuccess: () => {
      // ✅ Refresh blogs immediately after deletion
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    },
  });
};
