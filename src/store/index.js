import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import chatSlice from "./slices/chatSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "post", "chat"],
};
const reducer = combineReducers({
    user: userSlice,
    post: postSlice,
    chat: chatSlice
})
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    // reducer: {
    //     user: userSlice,
    // },
    reducer: persistedReducer
})

export default store;