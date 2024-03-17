import { createSlice } from "@reduxjs/toolkit";
import { postFeedListRedux } from "../actions/postAction";

const postSlice = createSlice({
    name: "post",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    reducers: {
        clearPostReduxStore(state, action) {
            return [];
        },
    },
    extraReducers: (builder) => {
        // login User
        builder.addCase(postFeedListRedux.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postFeedListRedux.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.code == 200) {
                state.data = action.payload.data;
            }
        })
        builder.addCase(postFeedListRedux.rejected, (state, action) => {
            console.log("ERROR", action.payload);
            state.isLoading = false;
            state.isError = true
        })
    },
});

export default postSlice.reducer;
export const { clearPostReduxStore } = postSlice.actions;