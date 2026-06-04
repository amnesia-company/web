import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {UserType} from "../lib/types";

const initialState: UserType = {
    id: 0,
    name: '',
    rating: 0,
    avatarUrl: "",
    backgroundUrl: '',
    status: '',
    borderAvatarType: '',
    createdAt: ""
}/**
 * Redux slice for the authenticated user.
 * Stores the profile data of the currently authenticated user.
 */
export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        /**
         * Partially updates the user profile in the store.
         * Only the fields present in the payload are overwritten;
         * all other fields retain their current values.
         *
         * @param action.payload - Partial UserType object with the fields to update.
         */
        setUserInfo(state, action: PayloadAction<Partial<UserType>>) {
            if (action.payload.id !== undefined) state.id = action.payload.id;
            if (action.payload.name !== undefined) state.name = action.payload.name;
            if (action.payload.rating !== undefined) state.rating = action.payload.rating;
            if (action.payload.avatarUrl !== undefined) state.avatarUrl = action.payload.avatarUrl;
            if (action.payload.backgroundUrl !== undefined) state.backgroundUrl = action.payload.backgroundUrl;
            if (action.payload.status !== undefined) state.status = action.payload.status;
            if (action.payload.borderAvatarType !== undefined) state.borderAvatarType = action.payload.borderAvatarType;
            if (action.payload.createdAt !== undefined) state.createdAt = action.payload.createdAt;
        }
    }
});

export const {setUserInfo} = userSlice.actions;

export const userReducer = userSlice.reducer;
