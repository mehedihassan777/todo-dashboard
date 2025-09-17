import { users } from "@/dummy-data/user-data";
import type { UserInputOutputInterface } from "@/types/user-input-output.interface";

// Dummy function to generate a fake JWT token
function generateAuthToken(user: UserInputOutputInterface): string {
  // In a real app, use a secure JWT library and secret
  return Buffer.from(`${user.id}:${user.username}:${Date.now()}`).toString("base64");
}

export class AuthService {
  /**
   * Authenticates a user by username and password.
   * @param username - The username to check
   * @param password - The password to check
   * @returns A fake auth token if credentials match, otherwise null
   */
  static async login(
    username: string,
    password: string
  ): Promise<{ token: string; userType: string, id: string } | null> {
    const user = users.find(
      (u) => (u.username === username || u.email === username) && u.password === password
    );
    if (!user) return null;
    return {
      token: generateAuthToken(user),
      userType: user.role || "user",
      id: user.id
    };
  }
}
