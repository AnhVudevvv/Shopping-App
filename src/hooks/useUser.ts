import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
    logout as logoutAction,
    updateUser as updateUserAction,
} from "../store/user/userSlice";
import type { IUser } from "../types/user.type";

export const useUser = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);

    const updateUser = useCallback(
        (userData: IUser | null) => {
            dispatch(updateUserAction(userData));
        },
        [dispatch]
    );

    const logout = useCallback(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    return {
        user,
        updateUser,
        logout,
    };
};
