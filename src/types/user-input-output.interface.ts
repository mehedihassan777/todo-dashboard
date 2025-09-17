export interface UserInputOutputInterface {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  lastLogin?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
