import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { IUser } from "../../types/user.type";
import { UserContext } from "./userContext";

const getInitialUser = (): IUser | null => {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) return null;

  try {
    return JSON.parse(savedUser) as IUser;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<IUser | null>(getInitialUser);

  const updateUser = useCallback((userData: IUser | null) => {
    setUser(userData);

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  }, []);

  const logout = useCallback(() => {
    updateUser(null);
  }, [updateUser]);

  const value = useMemo(
    () => ({
      user,
      updateUser,
      logout,
    }),
    [logout, updateUser, user]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
