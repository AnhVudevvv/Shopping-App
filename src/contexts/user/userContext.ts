import { createContext } from "react";
import type { IUser } from "../../types/user.type";

export const UserContext = createContext<{
  user: IUser | null;
  updateUser: (userData: IUser | null) => void;
  logout: () => void;
} | null>(null);
