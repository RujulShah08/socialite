import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutApi, registerApi } from "../../services/apiHandler";
import { otpVerificationApi } from "../../services/apiHandler";
import { loginApi } from "../../services/apiHandler";
import toastr from 'toastr';
import 'toastr/toastr.scss';


export const loginRedux = createAsyncThunk("user/login", async (data) => {
    try {
        let request = {
            "emailmobile": data?.emailmobile,
            "password": data?.password,
        }
        const response = await loginApi(request);
        console.log('response: ', response);
        if (response.code === 200) {
            toastr.success(response.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
            localStorage.setItem('userData', JSON.stringify(response.data));
        } else if (response.code == 401) {
            toastr.error(response.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
            localStorage.setItem('email', JSON.stringify(data?.emailmobile));
        } else {
            toastr.error(response.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
        }
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
})
export const registerRedux = createAsyncThunk("user/register", async (data) => {
    try {
        let request = {
            "first_name": data?.first_name,
            "last_name": data?.last_name,
            "email": data?.email,
            "password": data?.password,
            "dob": data?.dob,
            "mobile": data?.mobile,
        }
        const response = await registerApi(request);
        console.log('response: ', response);
        if (response.code === 200) {
            toastr.success(response.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
            localStorage.setItem('email', JSON.stringify(response.data.email));
        } else {
            toastr.error(response.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
        }
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
})
export const otpVerificationRedux = createAsyncThunk("user/otp verification", async (data) => {
    try {
        let emailFromLocalStorage = localStorage.getItem('email');
        emailFromLocalStorage = emailFromLocalStorage.replace(/^"(.*)"$/, '$1'); // Remove quotes

        let request = {
            "email": emailFromLocalStorage,
            "otp": data.otp_code,
        }
        console.log('request: ', request);
        const response = await otpVerificationApi(request);
        console.log('response: ', response);
        if (response.code === 200) {
            toastr.success(response.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
            localStorage.setItem('userData', JSON.stringify(response.data));
        } else {
            toastr.error(response.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
        }
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
})
export const logoutRedux = createAsyncThunk("user/logout", async () => {
    try {
        const response = await logoutApi();
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
})
