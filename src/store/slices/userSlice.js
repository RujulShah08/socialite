import { createSlice } from "@reduxjs/toolkit";
import { loginRedux, logoutRedux } from "../actions/userAction";
import { registerRedux } from "../actions/userAction";
import { otpVerificationRedux } from "../actions/userAction";
const userSlice = createSlice({
    name: "users",
    initialState: {
        isLoading: false,
        data: null,
        isLoggedIn: false,
        isError: false
    },
    reducers: {
        clearReduxStore(state, action) {
            return [];
        },
    },
    extraReducers: (builder) => {
        // login User
        builder.addCase(loginRedux.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(loginRedux.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.code == 200) {
                state.isLoggedIn = true
                state.data = action.payload;
            }
        })
        builder.addCase(loginRedux.rejected, (state, action) => {
            console.log("ERROR", action.payload);
            state.isLoading = false;
            state.isError = true
        })
        // register User
        builder.addCase(registerRedux.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(registerRedux.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(registerRedux.rejected, (state, action) => {
            console.log("ERROR", action.payload);
            state.isLoading = false;
            state.isError = true
        })
        // Otp Verification User
        builder.addCase(otpVerificationRedux.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(otpVerificationRedux.fulfilled, (state, action) => {
            if (action.payload.code == 200) {
                state.isLoggedIn = true
                state.data = action.payload;
            }
            state.isLoading = false;
        })
        builder.addCase(otpVerificationRedux.rejected, (state, action) => {
            console.log("ERROR", action.payload);
            state.isLoading = false;
            state.isError = true
        })
        // Logout User
        builder.addCase(logoutRedux.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(logoutRedux.fulfilled, (state, action) => {
            if (action.payload.code == 200) {
                state.isLoggedIn = false
                state.data = [];
                localStorage.clear();
            }
            state.isLoading = false;
        })
        builder.addCase(logoutRedux.rejected, (state, action) => {
            console.log("ERROR", action.payload);
            state.isLoading = false;
            state.isError = true
        })
    },
});

export default userSlice.reducer;
export const { clearReduxStore } = userSlice.actions;