import { createSlice } from "@reduxjs/toolkit";
import { chatListingRedux } from "../actions/chatAction";

const postSlice = createSlice({
    name: "chat",
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
        // chating list
        builder.addCase(chatListingRedux.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(chatListingRedux.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.code == 200) {
                state.data = action.payload.data;
            } else {
                state.data = [];
            }
        })
        builder.addCase(chatListingRedux.rejected, (state, action) => {
            console.log("ERROR", action.payload);
            state.isLoading = false;
            state.isError = true
        })
    },
});

export default postSlice.reducer;
export const { clearPostReduxStore } = postSlice.actions;