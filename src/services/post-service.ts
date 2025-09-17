import axios from "axios";
import type { PostOutputInterface } from "@/types/post-output.interface";

export async function fetchPosts(): Promise<PostOutputInterface[]> {
  const response = await axios.get<PostOutputInterface[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
}

export async function fetchPostById(id: number): Promise<PostOutputInterface> {
  const response = await axios.get<PostOutputInterface>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
}
