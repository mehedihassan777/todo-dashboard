import axios from "axios";
import type { UserDetailOutputInterface } from "@/types/user-detail-output.interface";

export async function fetchUsers(): Promise<UserDetailOutputInterface[]> {
  const response = await axios.get<UserDetailOutputInterface[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}
