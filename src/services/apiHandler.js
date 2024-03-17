import AxiosClientApi from "./AuthService";
import AxiosClientApiImage from "./AuthserviceImage";

/*==================================================== 
    Auth Routers                                                                              
====================================================== */

export function registerApi(request) {
    return AxiosClientApi.post('v1/user-auth/register', request)
}

export function otpVerificationApi(request) {
    return AxiosClientApi.post('v1/user-auth/otp-verification', request)
}

export function loginApi(request) {
    return AxiosClientApi.post('v1/user-auth/login', request)
}

export function logoutApi(request) {
    return AxiosClientApi.post('v1/user-auth/logout', request)
}

export function addPostApi(request) {
    return AxiosClientApi.post('v1/user-post/add-post', request)
}

export function postFeedListApi(request) {
    return AxiosClientApi.post('v1/user-post/post-feed-list', request)
}

export function userListForChatApi(request) {
    return AxiosClientApi.post('v1/chat/user-list-for-chat', request)
}

export function chatListingApi(request) {
    return AxiosClientApi.post('v1/chat/chat-listing', request)
}

export function searchUserApi(request) {
    return AxiosClientApi.post('v1/chat/search-user', request)
}

export function uploadPostFileApi(request) {
    return AxiosClientApiImage.post('v1/user-post/upload-post-file', request)
}
