import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://blog-app-1mfc.onrender.com/api/v1/blogs";

export const useEditBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, content, name, email }: any) => {
      const response = await axios.put(`${API_URL}/${id}?app=myapp1`, {
        title,
        content,
        name,
        email,
         app: "myapp1",
      });
      return response.data;
    },
    onSuccess: () => {
      // ✅ Refresh blogs after editing
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    },
  });
};
