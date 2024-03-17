import React from 'react'
import { useSelector } from 'react-redux';
import Constant from '../utils/constant';
function StoriesFeed({ handlePostPopup, handlePreviewPostPopup }) {
    const postData = useSelector((state) => {
        return state?.post?.data;
    })
    return (
        <div className="md:max-w-[580px] mx-auto flex-1 xl:space-y-6 space-y-3">
            {/* add story */}
            <div className="bg-white rounded-xl shadow-sm md:p-4 p-2 space-y-4 text-sm font-medium border1 dark:bg-dark2">
                <div className="flex items-center md:gap-3 gap-1" onClick={handlePostPopup}>
                    <div className="flex-1 bg-slate-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer dark:bg-dark3" uk-toggle="target: #create-status">
                        <div className="py-2.5 text-center dark:text-white"> What do you have in mind? </div>
                    </div>
                    <div className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-pink-100/60 hover:bg-pink-100 dark:bg-white/10 dark:hover:bg-white/20" uk-toggle="target: #create-status">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 stroke-pink-600 fill-pink-200/70" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 8h.01" />
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
                            <path d="M3.5 15.5l4.5 -4.5c.928 -.893 2.072 -.893 3 0l5 5" />
                            <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2.5 2.5" />
                        </svg>
                    </div>
                    <div className="cursor-pointer hover:bg-opacity-80 p-1 px-1.5 rounded-xl transition-all bg-sky-100/60 hover:bg-sky-100 dark:bg-white/10 dark:hover:bg-white/20" uk-toggle="target: #create-status">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 stroke-sky-600 fill-sky-200/70 " viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                            <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                        </svg>
                    </div>
                </div>
            </div>
            {
                postData?.length > 0 && postData?.map((value, index) => (
                    value?.media?.length == 1 ?
                        (
                            <div key={index} className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">
                                {/* post heading */}
                                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-3.jpg" alt className="w-9 h-9 rounded-full" /> </a>
                                    <div className="flex-1">
                                        <a href="timeline.html"> <h4 className="text-black dark:text-white"> Monroe Parker </h4> </a>
                                        <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                                    </div>
                                    <div className="-mr-1">
                                        <button type="button" className="button-icon w-8 h-8"> <ion-icon className="text-xl" name="ellipsis-horizontal" /> </button>
                                        <div className="w-[245px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click">
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
                                {/* post image */}
                                {value.media[0].media_type == "image" ? (
                                    <a href="#preview_modal" uk-toggle>
                                        <div className="relative w-full lg:h-96 h-full sm:px-4" onClick={handlePreviewPostPopup}>
                                            <img src={`${Constant.IMAGE_URL}/public/post_media/${value.media[0].name}`} alt className="sm:rounded-lg w-full h-full object-cover" />
                                        </div>
                                    </a>
                                ) : (
                                    <a href="#preview_modal">
                                        <div className="relative w-full lg:h-96 h-full sm:px-4">
                                            <video className="sm:rounded-lg w-full h-full object-cover" controls>
                                                <source src={`${Constant.IMAGE_URL}/public/post_media/${value.media[0].name}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </a>
                                )}
                                {/* post icons */}
                                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="heart" /> </button>
                                            <a href="#">1,300</a>
                                        </div>
                                        <div className="p-1 px-2 bg-white rounded-full drop-shadow-md w-[212px] dark:bg-slate-700 text-2xl" uk-drop="offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left">
                                            <div className="flex gap-2" uk-scrollspy="target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 👍 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> ❤️ </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😂 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😯 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😢 </span></button>
                                            </div>
                                            <div className="w-2.5 h-2.5 absolute -bottom-1 left-3 bg-white rotate-45 hidden" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700"> <ion-icon className="text-lg" name="chatbubble-ellipses" /> </button>
                                        <span>260</span>
                                    </div>
                                    <button type="button" className="button-icon ml-auto"> <ion-icon className="text-xl" name="paper-plane-outline" /> </button>
                                    <button type="button" className="button-icon"> <ion-icon className="text-xl" name="share-outline" /> </button>
                                </div>
                                <div className="sm:px-4 p-2.5 pt-0">
                                    <p className="font-normal"> {value.message} </p>
                                </div>
                                {/* add comment */}
                                <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                                    <img src="assets/images/avatars/avatar-7.jpg" alt className="w-6 h-6 rounded-full" />
                                    <div className="flex-1 relative overflow-hidden h-10">
                                        <textarea placeholder="Add Comment...." rows={1} className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent" defaultValue={""} />
                                        <div className="!top-2 pr-2" uk-drop="pos: bottom-right; mode: click">
                                            <div className="flex items-center gap-2" uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-sky-600">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-pink-600">
                                                    <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"> Replay</button>
                                </div>
                            </div>
                        ) : value?.media?.length > 1 ? (
                            <div key={index} className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">
                                {/* post heading */}
                                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-3.jpg" alt className="w-9 h-9 rounded-full" /> </a>
                                    <div className="flex-1">
                                        <a href="timeline.html"> <h4 className="text-black dark:text-white"> Monroe Parker </h4> </a>
                                        <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                                    </div>
                                    <div className="-mr-1">
                                        <button type="button" className="button-icon w-8 h-8"> <ion-icon className="text-xl" name="ellipsis-horizontal" /> </button>
                                        <div className="w-[245px]" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click">
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
                                {/* post image */}
                                <div className="relative uk-visible-toggle sm:px-4" tabIndex={-1} uk-slideshow="animation: push;ratio: 4:3">
                                    <ul className="uk-slideshow-items overflow-hidden rounded-xl" uk-lightbox="animation: fade">
                                        {value.media.length > 0 && value.media.map((imageValue, imageIndex) => (
                                            imageValue.media_type == "image" ? (
                                                <li key={imageIndex} className="w-full">
                                                    <a className="inline" href="../../getuikit.com/docs/images/photo3.jpg" data-caption={`Caption${imageIndex}`}>
                                                        <img src={`${Constant.IMAGE_URL}/public/post_media/${imageValue.name}`} alt className="w-full h-full absolute object-cover insta-0" />
                                                    </a>
                                                </li>
                                            ) : (
                                                <li key={imageIndex} className="w-full">
                                                    <a className="inline" href="../../getuikit.com/docs/images/photo3.jpg" data-caption={`Caption${imageIndex}`}>
                                                        <video className="sm:rounded-lg w-full h-full object-cover" controls>
                                                            <source src={`${Constant.IMAGE_URL}/public/post_media/${imageValue.name}`} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </a>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                    <a className="nav-prev left-6" href="#" uk-slideshow-item="previous"> <ion-icon name="chevron-back" className="text-2xl" /> </a>
                                    <a className="nav-next right-6" href="#" uk-slideshow-item="next"> <ion-icon name="chevron-forward" className="text-2xl" /></a>
                                </div>
                                {/* post icons */}
                                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="heart" /> </button>
                                            <a href="#">1,300</a>
                                        </div>
                                        <div className="p-1 px-2 bg-white rounded-full drop-shadow-md w-[212px] dark:bg-slate-700 text-2xl" uk-drop="offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left">
                                            <div className="flex gap-2" uk-scrollspy="target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 👍 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> ❤️ </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😂 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😯 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😢 </span></button>
                                            </div>
                                            <div className="w-2.5 h-2.5 absolute -bottom-1 left-3 bg-white rotate-45 hidden" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700"> <ion-icon className="text-lg" name="chatbubble-ellipses" /> </button>
                                        <span>260</span>
                                    </div>
                                    <button type="button" className="button-icon ml-auto"> <ion-icon className="text-xl" name="paper-plane-outline" /> </button>
                                    <button type="button" className="button-icon"> <ion-icon className="text-xl" name="share-outline" /> </button>
                                </div>
                                {/* add comment */}
                                <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                                    <img src="assets/images/avatars/avatar-7.jpg" alt className="w-6 h-6 rounded-full" />
                                    <div className="flex-1 relative overflow-hidden h-10">
                                        <textarea placeholder="Add Comment...." rows={1} className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent" defaultValue={""} />
                                        <div className="!top-2 pr-2" uk-drop="pos: bottom-right; mode: click">
                                            <div className="flex items-center gap-2" uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-sky-600">
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-pink-600">
                                                    <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"> Replay</button>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="bg-white rounded-xl shadow-sm text-sm font-medium border1 dark:bg-dark2">
                                {/* post heading */}
                                <div className="flex gap-3 sm:p-4 p-2.5 text-sm font-medium">
                                    <a href="timeline.html"> <img src="assets/images/avatars/avatar-5.jpg" alt className="w-9 h-9 rounded-full" /> </a>
                                    <div className="flex-1">
                                        <a href="timeline.html"> <h4 className="text-black dark:text-white"> John Michael </h4> </a>
                                        <div className="text-xs text-gray-500 dark:text-white/80"> 2 hours ago</div>
                                    </div>
                                    <div className="-mr-1">
                                        <button type="button" className="button__ico w-8 h-8" aria-haspopup="true" aria-expanded="false"> <ion-icon className="text-xl md hydrated" name="ellipsis-horizontal" role="img" aria-label="ellipsis horizontal" /> </button>
                                        <div className="w-[245px] uk-dropdown" uk-dropdown="pos: bottom-right; animation: uk-animation-scale-up uk-transform-origin-top-right; animate-out: true; mode: click">
                                            <nav>
                                                <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="bookmark-outline" role="img" aria-label="bookmark outline" />  Add to favorites </a>
                                                <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="notifications-off-outline" role="img" aria-label="notifications off outline" /> Mute Notification </a>
                                                <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="flag-outline" role="img" aria-label="flag outline" />  Report this post </a>
                                                <a href="#"> <ion-icon className="text-xl shrink-0 md hydrated" name="share-outline" role="img" aria-label="share outline" />  Share your profile </a>
                                                <hr />
                                                <a href="#" className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"> <ion-icon className="text-xl shrink-0 md hydrated" name="stop-circle-outline" role="img" aria-label="stop circle outline" />  Unfollow </a>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:px-4 p-2.5 pt-0">
                                    <p className="font-normal"> {value.message} </p>
                                </div>
                                {/* post icons */}
                                <div className="sm:p-4 p-2.5 flex items-center gap-4 text-xs font-semibold">
                                    <div>
                                        <div className="flex items-center gap-2.5">
                                            <button type="button" className="button-icon text-red-500 bg-red-100 dark:bg-slate-700"> <ion-icon className="text-lg" name="heart" /> </button>
                                            <a href="#">1,300</a>
                                        </div>
                                        <div className="p-1 px-2 bg-white rounded-full drop-shadow-md w-[212px] dark:bg-slate-700 text-2xl" uk-drop="offset:10;pos: top-left; animate-out: true; animation: uk-animation-scale-up uk-transform-origin-bottom-left">
                                            <div className="flex gap-2" uk-scrollspy="target: > button; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 👍 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> ❤️ </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😂 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😯 </span></button>
                                                <button type="button" className="text-red-600 hover:scale-125 duration-300"> <span> 😢 </span></button>
                                            </div>
                                            <div className="w-2.5 h-2.5 absolute -bottom-1 left-3 bg-white rotate-45 hidden" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button type="button" className="button-icon bg-slate-200/70 dark:bg-slate-700"> <ion-icon className="text-lg" name="chatbubble-ellipses" /> </button>
                                        <span>260</span>
                                    </div>
                                    <button type="button" className="button-icon ml-auto"> <ion-icon className="text-xl" name="paper-plane-outline" /> </button>
                                    <button type="button" className="button-icon"> <ion-icon className="text-xl" name="share-outline" /> </button>
                                </div>
                                {/* add comment */}
                                <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
                                    <img src="assets/images/avatars/avatar-7.jpg" alt className="w-6 h-6 rounded-full" />
                                    <div className="flex-1 relative overflow-hidden h-10">
                                        <textarea placeholder="Add Comment...." rows={1} className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent" aria-haspopup="true" aria-expanded="false" defaultValue={""} />
                                        <div className="!top-2 pr-2 uk-drop" uk-drop="pos: bottom-right; mode: click">
                                            <div className="flex items-center gap-2" uk-scrollspy="target: > svg; cls: uk-animation-slide-right-small; delay: 100 ;repeat: true">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 fill-sky-600" style={{ opacity: 0 }}>
                                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 fill-pink-600" style={{ opacity: 0 }}>
                                                    <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"> Replay</button>
                                </div>
                            </div>
                        )
                ))
            }
            {/* placeholder */}
            <div className="rounded-xl shadow-sm p-4 space-y-4 bg-slate-200/40 animate-pulse border1 dark:bg-dark2">
                <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-300/20" />
                    <div className="flex-1 space-y-3">
                        <div className="w-40 h-5 rounded-md bg-slate-300/20" />
                        <div className="w-24 h-4 rounded-md bg-slate-300/20" />
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-300/20" />
                </div>
                <div className="w-full h-52 rounded-lg bg-slate-300/10 my-3"> </div>
                <div className="flex gap-3">
                    <div className="w-16 h-5 rounded-md bg-slate-300/20" />
                    <div className="w-14 h-5 rounded-md bg-slate-300/20" />
                    <div className="w-6 h-6 rounded-full bg-slate-300/20 ml-auto" />
                    <div className="w-6 h-6 rounded-full bg-slate-300/20  " />
                </div>
            </div>
        </div>
    )
}

export default StoriesFeed