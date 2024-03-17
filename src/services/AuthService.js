import axios from 'axios';
import CryptoJS from 'crypto-js';

const SECRET = CryptoJS.enc.Hex.parse('CGRNjSwcGqCzAR65sgyXVT7jRrjiKl77');
const IV = CryptoJS.enc.Hex.parse('CGRNjSwcGqCzAR65');
// import { logOutRedirectCall } from '../config/common';
// import Constatnt from '../config/constant';
const AxiosClientApi = axios.create({
    baseURL: 'http://localhost:8025/api/',
    headers: {
        'api-key': '5Vd1RUJ74TN1a0ctnw105Fvt4b5GeADIqBpjFK60X2A=',
        'Accept-Language': 'en',
        'Content-Type': 'text/plain',
        // 'token': userData.token ? userData.token : "",
        // "Content-Type": "multipart/form-data",
    }
});
// // request AxiosClient
AxiosClientApi.interceptors.request.use(function (request) {
    request.data = bodyEncryption(request.data, true)
    const userDataString = localStorage.getItem('userData');
    let userData = "";
    let token = "";
    if (userDataString) {
        userData = JSON.parse(userDataString);
        token = bodyPlainEncryption(userData.device_info.token)
    }
    request.headers['token'] = token;
    return request;
});

// Response AxiosClient
AxiosClientApi.interceptors.response.use(
    function (response) {
        response = bodyDecryptData(response.data);
        // console.log('Api Response By Client  ======> ', response);
        return response;
    },
    function (error) {
        error.response.data = bodyDecryptData(error?.response?.data);
        if (error.response !== undefined && error.response !== "" && error.response.data.code) {
            // console.log('Api Response By Client  ======> ', error.response.data);
            return error.response.data;
        } else {
            return Promise.reject(error);
        }
    }
);

export const bodyEncryption = (request, isStringify) => {
    try {
        let new_request = (isStringify) ? JSON.stringify(request) : request;
        const encryptedData = CryptoJS.AES.encrypt(new_request, SECRET, { iv: IV }).toString();
        return encryptedData;
    } catch (error) {
        console.log('Encryption error: ', error);
        return '';
    }
};
export const bodyPlainEncryption = (request) => {
    try {
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(request), SECRET, { iv: IV }).toString();
        return encryptedData;
    } catch (error) {
        console.log('Encryption error: ', error);
        return '';
    }
};
export const bodyDecryptData = (data) => {
    try {
        // Use the provided cipherParams instead of a hardcoded string
        let decrypted = CryptoJS.AES.decrypt(data, SECRET, { iv: IV });

        // Convert the decrypted object to a string using Utf8
        let decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedText);
    } catch (error) {
        console.log("error", error);
        return '';
    }
};
export default AxiosClientApi;

// Get Redux Data Withut use useSelector
// export const getDataFromLocal = () => {
//     const userData = JSON.parse(
//         JSON.parse(localStorage.getItem("persist:root"))?.user
//     );
//     return userData;
// };