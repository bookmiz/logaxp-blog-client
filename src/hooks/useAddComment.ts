import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://blog-app-1mfc.onrender.com/api/v1/blogs";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      commentData,
    }: {
      id: string;
      commentData: any;
    }) => {
      const response = await axios.post(
        `${API_URL}/${id}/comments?app=myapp1`,
        commentData
      );
      return response.data; // ✅ Updated blog object with new comments
    },
    onSuccess: () => {
      // ✅ Use your existing query key to refetch updated blog data
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    },
  });
};
