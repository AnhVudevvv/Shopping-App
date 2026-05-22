import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../types/user.type";

interface UserState {
  user: IUser | null;
}

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

const initialState: UserState = {
  user: getInitialUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
