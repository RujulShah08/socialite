import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchUserApi, userListForChatApi } from "../../services/apiHandler";
import { chatListingApi } from "../../services/apiHandler";
export const userListForChatRedux = createAsyncThunk("chat/user-list-for-chat", async (data) => {
    try {
        const response = await userListForChatApi();
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
})
export const chatListingRedux = createAsyncThunk("chat/chat listing", async (data) => {
    try {
        const response = await chatListingApi(data);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
})
export const searchUserRedux = createAsyncThunk("chat/search user", async (data) => {
    try {
        const response = await searchUserApi(data);
        console.log('response: ', response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
})