import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: {
        isLoggedIn: false,
        data: "",
        token: ""
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        setData: (state, action) => {
            state.auth.data = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setData, setAuth } = userSlice.actions;

export default userSlice.reducer