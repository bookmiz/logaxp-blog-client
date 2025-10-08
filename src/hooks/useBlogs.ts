import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../services/blogService";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"], 
    queryFn: fetchBlogs, 
  }); 
};
