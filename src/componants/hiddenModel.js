import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addPostRedux } from '../store/actions/postAction';
import { postFeedListRedux } from '../store/actions/postAction';

function HiddenModel(props) {
    const dispatch = useDispatch();
    const [handlePostPopup, setHandlePostPopup] = useState(false);
    const [handlePreviewPostPopup, sethandlePreviewPostPopup] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [iscreate, setIsCreate] = useState(false);
    const [selectedImagesError, setSelectedImagesError] = useState();
    const fileInputRef = useRef(null);
    const fileVideoRef = useRef(null);
    const [textValue, setTextValue] = useState("");
    const [imageValue, setImageValue] = useState([]);
    const [videoValue, setVideoValue] = useState([]);
    useEffect(() => {
        if (props.handlePreviewPostPopup > 0) {
            sethandlePreviewPostPopup(true);
        }
    }, [props.handlePreviewPostPopup]);
    useEffect(() => {
        if (props.handlePostPopup > 0) {
            setHandlePostPopup(true)
        }
    }, [props.handlePostPopup])

    //Add Post Image 
    const handleFileInputChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length > 0 && selectedFiles.length <= 7) {
            setImageValue(selectedFiles)
            setIsCreate(true);
            setSelectedImagesError("");
            const imageUrls = [];
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                if (file.type.startsWith('image/')) {
                    const imageUrl = URL.createObjectURL(file);
                    imageUrls.push(imageUrl);
                }
            }
            setSelectedImages(imageUrls);
        } else {
            setImageValue([])
            setSelectedImagesError("The limit is 7 photos or video");
            setSelectedImages([]);
        }
    };
    const handleFileVideoChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles.length > 0 && selectedFiles.length <= 7) {
            setVideoValue(selectedFiles);
            setIsCreate(true);
            setSelectedImagesError("");
            const imageUrls = [];
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                // if (file.type.startsWith('image/')) {
                const imageUrl = URL.createObjectURL(file);
                imageUrls.push(imageUrl);
                // }
            }
            setSelectedVideos(imageUrls);
        } else {
            setSelectedImagesError("The limit is 7 photos or video");
            setSelectedVideos([]);
        }
    };
    const handleRemoveImage = (index) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages.splice(index, 1);
        const filesArray = Array.from(imageValue);
        filesArray.splice(index, 1);

        const dataTransfer = new DataTransfer();
        filesArray.forEach((file) => {
            dataTransfer.items.add(file);
        });
        const updatedFileList = dataTransfer.files;
        setImageValue(updatedFileList);

        if (newSelectedImages.length == 0) {
            if (videoValue.length == 0 && !textValue) {
                setIsCreate(false);
            }
            setImageValue([])
        }
        setSelectedImages(newSelectedImages);
    };
    const handleRemoveVideo = (index) => {
        const newSelectedVideos = [...selectedVideos];
        newSelectedVideos.splice(index, 1);
        const filesArray = Array.from(videoValue);
        filesArray.splice(index, 1);

        const dataTransfer = new DataTransfer();
        filesArray.forEach((file) => {
            dataTransfer.items.add(file);
        });
        const updatedFileList = dataTransfer.files;
        setVideoValue(updatedFileList);
        if (newSelectedVideos.length == 0) {
            if (imageValue.length == 0 && !textValue) {
                setIsCreate(false);
            }
            setVideoValue([]);
        }
        setSelectedVideos(newSelectedVideos);
    };
    const handleSubmitAddPostEvent = () => {
        let request = {
            message: textValue,
            post_image: imageValue,
            post_video: videoValue
        }
        dispatch(addPostRedux(request)).then((result) => {
            if (result?.payload?.code == 200) {
                setSelectedImagesError([]);
                setTextValue("");
                setImageValue([]);
                setVideoValue([]);
                setIsCreate(false);
                setSelectedImages([]);
                setSelectedVideos([]);
                setHandlePostPopup(false);
                dispatch(postFeedListRedux());
            }
        });;
    }

    return (
        <>
            {/* post preview modal */}
            <div className={`hidden lg:p-20 max-lg:!items-start ${handlePreviewPostPopup ? 'uk-modal uk-open' : ''}`} id="preview_modal" uk-modal>
                <div className="uk-modal-dialog tt relative mx-auto overflow-hidden shadow-xl rounded-lg lg:flex items-center ax-w-[86rem] w-full lg:h-[80vh]">
                    {/* image previewer */}
                    <div className="lg:h-full lg:w-[calc(100vw-400px)] w-full h-96 flex justify-center items-center relative">
                        <div className="relative z-10 w-full h-full">
                            <img src="assets/images/post/post-1.jpg" alt className="w-full h-full object-cover absolute" />
                        </div>
                        {/* close button */}
                        <button type="button" className="bg-white rounded-full p-2 absolute right-0 top-0 m-3 uk-animation-slide-right-medium z-10 dark:bg-slate-600 uk-modal-close">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => sethandlePreviewPostPopup(false)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* right sidebar */}
                    <div className="lg:w-[400px] w-full bg-white h-full relative  overflow-y-auto shadow-xl dark:bg-dark2 flex flex-col justify-between">
                        <div className="p-5 pb-0">
                            {/* story heading */}
                            <div className="flex gap-3 text-sm font-medium">
                                <img src="assets/images/avatars/avatar-5.jpg" alt className="w-9 h-9 rounded-full" />
                                <div className="flex-1">
                                    <h4 className="text-black font-medium dark:text-white"> Steeve </h4>
                                    <div className="text-gray-500 text-xs dark:text-white/80"> 2 hours ago</div>
                                </div>
                                {/* dropdown */}
                                <div className="-m-1">
                                    <button type="button" className="button__ico w-8 h-8"> <ion-icon className="text-xl" name="ellipsis-horizontal" /> </button>
                                    <div className="w-[253px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true">
                                        <nav>
                                            <a href="#"> <ion-icon className="text-xl shrink-0" name="bookmark-outline" />  Add to favorites </a>
                                            <a href="#"> <ion-icon className="text-xl shrink-0" name="notifications-off-outline" /> Mute Notification </a>
                                            <a href="#"> <ion-icon className="text-xl shrink-0" name="flag-outline" />  Report this post </a>
                                            <a href="#"> <ion-icon className="text-xl shrink-0" name="share-outline" />  Share your profile </a>
                                            <hr />
                                            <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon className="text-xl shrink-0" name="stop-circle-outline" />  Unfollow </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <p className="font-normal text-sm leading-6 mt-4"> Photography is the art of capturing light with a camera.  it can be fun, challenging. It can also be a hobby, a passion. 📷 </p>
                            <div className="shadow relative -mx-5 px-5 py-3 mt-3">
                                <div className="flex items-center gap-4 text-xs font-semibold">
                                    <div className="flex items-center gap-2.5">
                                        <button type="button" className="button__ico text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="heart" /> </button>
                                        <a href="#">1,300</a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="button__ico bg-slate-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="chatbubble-ellipses" /> </button>
                                        <span>260</span>
                                    </div>
                                    <button type="button" className="button__ico ml-auto"> <ion-icon className="text-xl" name="share-outline" /> </button>
                                    <button type="button" className="button__ico"> <ion-icon className="text-xl" name="bookmark-outline" /> </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 h-full overflow-y-auto flex-1">
                            {/* comment list */}
                            <div className="relative text-sm font-medium space-y-5">
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-2.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                                        <p className="mt-0.5">What a beautiful, I love it. 😍 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-3.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                                        <p className="mt-0.5">   You captured the moment.😎 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-7.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Alexa </a>
                                        <p className="mt-0.5"> This photo is amazing! </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-4.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> John</a>
                                        <p className="mt-0.5"> Wow, You are so talented 😍 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-5.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Michael </a>
                                        <p className="mt-0.5"> I love taking photos   🌳🐶</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-3.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                                        <p className="mt-0.5">  Awesome. 😊😢 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-5.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Jesse </a>
                                        <p className="mt-0.5"> Well done 🎨📸 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-2.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Steeve </a>
                                        <p className="mt-0.5">What a beautiful, I love it. 😍 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-7.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Alexa </a>
                                        <p className="mt-0.5"> This photo is amazing! </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-4.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> John</a>
                                        <p className="mt-0.5"> Wow, You are so talented 😍 </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-5.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Michael </a>
                                        <p className="mt-0.5"> I love taking photos   🌳🐶</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 relative">
                                    <img src="assets/images/avatars/avatar-3.jpg" alt className="w-6 h-6 mt-1 rounded-full" />
                                    <div className="flex-1">
                                        <a href="#" className="text-black font-medium inline-block dark:text-white"> Monroe </a>
                                        <p className="mt-0.5">  Awesome. 😊😢 </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-3 text-sm font-medium flex items-center gap-2">
                            <img src="assets/images/avatars/avatar-2.jpg" alt className="w-6 h-6 rounded-full" />
                            <div className="flex-1 relative overflow-hidden ">
                                <textarea placeholder="Add Comment...." rows={1} className="w-full resize-  px-4 py-2 focus:!border-transparent focus:!ring-transparent resize-y" defaultValue={""} />
                                <div className="flex items-center gap-2 absolute bottom-0.5 right-0 m-3">
                                    <ion-icon className="text-xl flex text-blue-700" name="image" />
                                    <ion-icon className="text-xl flex text-yellow-500" name="happy" />
                                </div>
                            </div>
                            <button type="submit" className="hidden text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"> Replay</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* create status */}
            <div className={`hidden lg:p-20 ${handlePostPopup ? 'uk-modal uk-open' : ''}`} id="create-status" uk-modal>
                <div className="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white shadow-xl rounded-lg md:w-[520px] w-full dark:bg-dark2">
                    <div className="text-center py-4 border-b mb-0 dark:border-slate-700">
                        <h2 className="text-sm font-medium text-black"> Create Status </h2>
                        {/* close button */}
                        <button type="button" className="button-icon absolute top-0 right-0 m-2.5 uk-modal-close">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" onClick={() => setHandlePostPopup(false)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-5 mt-3 p-2">
                        <textarea className="w-full !text-black placeholder:!text-black !bg-white !border-transparent focus:!border-transparent focus:!ring-transparent !font-normal !text-xl   dark:!text-white dark:placeholder:!text-white dark:!bg-slate-800" name id rows={6} placeholder="What do you have in mind?" value={textValue} onChange={(event) => {
                            if (event.target.value && event.target.value != "") { setIsCreate(true); setTextValue(event.target.value) } else {
                                setIsCreate(false)
                            }
                        }}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-sm py-2 px-4 font-medium flex-wrap">
                        <ul
                            className="uk-slider-items w-[calc(100%+14px)]"
                            uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
                        >
                            {selectedImages?.map((value, index) => (
                                <li key={index} className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300 relative flex items-center">
                                    <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                        <img
                                            key={index}
                                            src={value}
                                            alt={`Selected Image ${index + 1}`}
                                            className="absolute w-full h-full object-cover"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        />
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1"
                                        stroke="currentColor"
                                        className="w-6 h-6 absolute top-0 right-0 m-2 text-red-500 cursor-pointer"
                                        style={{ marginTop: "-1%" }}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </li>

                            ))}
                        </ul>
                        <ul
                            className="uk-slider-items w-[calc(100%+14px)]"
                            uk-scrollspy="target: > li; cls: uk-animation-scale-up; delay: 20;repeat:true"
                        >
                            {selectedVideos?.map((value, index) => (
                                <li key={index} className="md:pr-3 pr-2 hover:scale-[1.15] hover:-rotate-2 duration-300 relative flex items-center">
                                    <div className="md:w-16 md:h-16 w-12 h-12 relative md:border-4 border-2 shadow border-white rounded-full overflow-hidden dark:border-slate-700">
                                        <video
                                            key={index}
                                            controls // Add the controls attribute for playback controls
                                            className="absolute w-full h-full object-cover"
                                            style={{ maxWidth: '100%', height: 'auto' }}
                                        >
                                            <source src={value} type="video/mp4" />
                                        </video>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1"
                                        stroke="currentColor"
                                        className="w-6 h-6 absolute top-0 right-0 m-2 text-red-500 cursor-pointer"
                                        style={{ marginTop: '-1%' }}
                                        onClick={() => handleRemoveVideo(index)}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </li>


                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center gap-2 text-sm py-2 px-4 font-medium flex-wrap">
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            multiple
                            onChange={handleFileInputChange}
                        />
                        <button type="button" className="flex items-center gap-1.5" onClick={() => fileInputRef.current.click()}>
                            {/* <ion-icon name="image" className="text-base" />
                            Image */}
                            <div className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-pink-100/60 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-white/20" uk-toggle="target: #create-status">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 stroke-pink-600 fill-pink-200/70" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 8h.01" />
                                    <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                                    <path d="M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5" />
                                    <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5" />
                                </svg>
                            </div>
                        </button>
                        <input
                            type="file"
                            ref={fileVideoRef}
                            style={{ display: 'none' }}
                            accept="video/*"
                            multiple
                            onChange={handleFileVideoChange}
                        />
                        <button type="button" className="flex items-center gap-1.5" onClick={() => fileVideoRef.current.click()}>
                            <div className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-sky-100/60 hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/20" uk-toggle="target: #create-status">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 stroke-sky-600 fill-sky-200/70 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                                    <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                                </svg>
                            </div>
                        </button>
                    </div>
                    {selectedImagesError && (
                        <div className="p-5 pb-0 pt-0 flex justify-between items-center" style={{ color: "red" }}>
                            {selectedImagesError}
                        </div>
                    )}
                    <div className="p-5 flex justify-between items-center">
                        <div>
                            <button className="inline-flex items-center py-1 px-2.5 gap-1 font-medium text-sm rounded-full bg-slate-50 border-2 border-slate-100 group aria-expanded:bg-slate-100 aria-expanded: dark:text-white dark:bg-slate-700 dark:border-slate-600" type="button">
                                Everyone
                                <ion-icon name="chevron-down-outline" className="text-base duration-500 group-aria-expanded:rotate-180" />
                            </button>
                            <div className="p-2 bg-white rounded-lg shadow-lg text-black font-medium border border-slate-100 w-60 dark:bg-slate-700" uk-drop="offset:10;pos: bottom-left; reveal-left;animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left ; mode:click">
                                <form>
                                    <label>
                                        <input type="radio" name="radio-status" id="monthly1" className="peer appearance-none hidden" defaultChecked />
                                        <div className=" relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3">
                                            <div className="text-sm">  Everyone </div>
                                            <ion-icon name="checkmark-circle" className="hidden active absolute -translate-y-1/2 right-2 text-2xl text-blue-600 uk-animation-scale-up" />
                                        </div>
                                    </label>
                                    <label>
                                        <input type="radio" name="radio-status" id="monthly1" className="peer appearance-none hidden" />
                                        <div className=" relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3">
                                            <div className="text-sm"> Friends </div>
                                            <ion-icon name="checkmark-circle" className="hidden active absolute -translate-y-1/2 right-2 text-2xl text-blue-600 uk-animation-scale-up" />
                                        </div>
                                    </label>
                                    <label>
                                        <input type="radio" name="radio-status" id="monthly" className="peer appearance-none hidden" />
                                        <div className=" relative flex items-center justify-between cursor-pointer rounded-md p-2 px-3 hover:bg-secondery peer-checked:[&_.active]:block dark:bg-dark3">
                                            <div className="text-sm"> Only me </div>
                                            <ion-icon name="checkmark-circle" className="hidden active absolute -translate-y-1/2 right-2 text-2xl text-blue-600 uk-animation-scale-up" />
                                        </div>
                                    </label>
                                </form>
                            </div>
                        </div>
                        {iscreate && (
                            <div className="flex items-center gap-2">
                                <button type="button" className="button bg-blue-500 text-white py-2 px-12 text-[14px]" onClick={handleSubmitAddPostEvent}> Create</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* create story */}
            <div className="hidden lg:p-20" id="create-story" uk-modal>
                <div className="uk-modal-dialog tt relative overflow-hidden mx-auto bg-white p-7 shadow-xl rounded-lg md:w-[520px] w-full dark:bg-dark2">
                    <div className="text-center py-3 border-b -m-7 mb-0 dark:border-slate-700">
                        <h2 className="text-sm font-medium"> Create Status </h2>
                        {/* close button */}
                        <button type="button" className="button__ico absolute top-0 right-0 m-2.5 uk-modal-close">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-5 mt-7">
                        <div>
                            <label htmlFor className="text-base">What do you have in mind? </label>
                            <input type="text" className="w-full mt-3" />
                        </div>
                        <div>
                            <div className="w-full h-72 relative border1 rounded-lg overflow-hidden bg-[url('../images/ad_pattern.html')] bg-repeat">
                                <label htmlFor="createStatusUrl" className="flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 w-full pb-6 pt-10 cursor-pointer bg-gradient-to-t from-gray-700/60">
                                    <input id="createStatusUrl" type="file" className="hidden" />
                                    <ion-icon name="image" className="text-3xl text-teal-600" />
                                    <span className="text-white mt-2">Browse to Upload image </span>
                                </label>
                                <img id="createStatusImage" src="#" alt="Uploaded Image" accept="image/png, image/jpeg" style={{ display: 'none' }} className="w-full h-full absolute object-cover" />
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-start gap-2">
                                <ion-icon name="time-outline" className="text-3xl text-sky-600  rounded-full bg-blue-50 dark:bg-transparent" />
                                <p className="text-sm text-gray-500 font-medium"> Your Status will be available <br /> for <span className="text-gray-800"> 24 Hours</span> </p>
                            </div>
                            <button type="button" className="button bg-blue-500 text-white px-8" > Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default HiddenModel
