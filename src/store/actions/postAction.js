import { createAsyncThunk } from "@reduxjs/toolkit";
import { addPostApi } from "../../services/apiHandler";
import { uploadPostFileApi } from "../../services/apiHandler";
import { postFeedListApi } from "../../services/apiHandler";
import toastr from 'toastr';
import 'toastr/toastr.scss';

export const addPostRedux = createAsyncThunk("post/add-post", async (data) => {
    try {
        let request = {
            "message": data?.message
        }
        let media = [];
        if (data?.post_image?.length > 0) {
            for (const image of data?.post_image ?? []) {
                const formData = new FormData();
                formData.append('post_media', image);
                const response = await uploadPostFileApi(formData);
                if (response.code === 200) {
                    media.push({ name: response?.data?.post_media, media_type: "image" })
                }
            }
        }
        if (data?.post_video?.length > 0) {
            for (const video of data?.post_video ?? []) {
                const formData = new FormData();
                formData.append('post_media', video);
                const response = await uploadPostFileApi(formData);
                if (response.code === 200) {
                    media.push({ name: response?.data?.post_media, media_type: "video" })
                }
            }
        }
        request.post_media = media
        console.log('request: ', request);
        const response = await addPostApi(request);
        console.log('response: ', response);
        if (response.code === 200) {
            toastr.success(response?.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
        } else {
            toastr.error(response?.message, 'Event', {
                progressBar: true,
                timeOut: 3000,
            });
        }
        console.log('response: ', response);
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
})

export const postFeedListRedux = createAsyncThunk("post/post-feed-list", async (data) => {
    try {
        const response = await postFeedListApi();
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
})