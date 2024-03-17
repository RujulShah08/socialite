import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Constant from '../../../utils/constant';
import { chatListingRedux } from '../../../store/actions/chatAction';
import io from 'socket.io-client';
function MessageFeed({ userChatRoomId, receiverData, isMessageSentFun }) {
    const dispatch = useDispatch();
    const [messageValue, setMessageValue] = useState("");
    const [socket, setSocket] = useState(null);
    const [reload, setReload] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(0);
    const userId = useSelector((state) => {
        return state?.user?.data?.data?._id;
    })
    const chatData = useSelector((state) => {
        return state?.chat?.data;
    })
    useEffect(() => {
        const newSocket = io('http://localhost:8025/socket', {
            query: {
                user_id: userId,
            },
        });

        newSocket.on('send_message', (data) => {
            setMessageValue("")
            dispatch(chatListingRedux({ chat_room_id: data.chat_room_id }));
            isMessageSentFun();
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);
    const handleSendMessage = () => {
        socket.emit('send_message', { "receiver_id": receiverData?._id, "message": messageValue, }, (acknowledgment) => {
            // This callback function will be executed when the server acknowledges the message
            console.log('Message sent:', acknowledgment);
            isMessageSentFun();
            // You can add your own logic based on the acknowledgment
        });
    }
    return (
        <>
            {userChatRoomId && (
                <div className="flex-1">
                    {/* chat heading */}
                    <div className="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700 uk-animation-slide-top-medium">
                        <div className="flex items-center sm:gap-4 gap-2">
                            {/* toggle for mobile */}
                            <button type="button" className="md:hidden" uk-toggle="target: #side-chat ; cls: max-md:-translate-x-full">
                                <ion-icon name="chevron-back-outline" className="text-2xl -ml-4" />
                            </button>
                            <div className="relative cursor-pointer max-md:hidden" uk-toggle="target: .rightt ; cls: hidden">
                                <img src={`${Constant.IMAGE_URL}/public/post_media/${receiverData?.profile_image}`} alt className="w-8 h-8 rounded-full shadow" />
                                <div className="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px" />
                            </div>
                            <div className="cursor-pointer" uk-toggle="target: .rightt ; cls: hidden">
                                <div className="text-base font-bold"> {receiverData?.first_name + " " + receiverData?.last_name}</div>
                                <div className="text-xs text-green-500 font-semibold"> Online</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button type="button" className="button__ico">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button type="button" className="hover:bg-slate-100 p-1.5 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </button>
                            <button type="button" className="hover:bg-slate-100 p-1.5 rounded-full" uk-toggle="target: .rightt ; cls: hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* chats bubble */}
                    <div className="w-full p-5 py-10 overflow-y-auto md:h-[calc(100vh-204px)] h-[calc(100vh-195px)]">
                        <div className="py-10 text-center text-sm lg:pt-8">
                            <img src={`${Constant.IMAGE_URL}/public/post_media/${receiverData?.profile_image}`} className="w-24 h-24 rounded-full mx-auto mb-3" alt />
                            <div className="mt-8">
                                <div className="md:text-xl text-base font-medium text-black dark:text-white"> {receiverData?.first_name + " " + receiverData?.last_name} </div>
                                <div className="text-gray-500 text-sm   dark:text-white/80"> @{receiverData?.first_name} </div>
                            </div>
                            <div className="mt-3.5">
                                <a href="timeline.html" className="inline-block rounded-lg px-4 py-1.5 text-sm font-semibold bg-secondery">View profile</a>
                            </div>
                        </div>
                        <div className="text-sm font-medium space-y-6">
                            {chatData?.chat_data?.length > 0 && chatData?.chat_data.map((value, index) => (
                                receiverData?._id == value.sender_id ? (
                                    < div key={index} className="flex gap-3" >
                                        <img src="assets/images/avatars/avatar-2.jpg" alt className="w-9 h-9 rounded-full shadow" />
                                        <div className="px-4 py-2 rounded-[20px] max-w-sm bg-secondery"> {value?.message} </div>
                                    </div>

                                ) : (
                                    <div key={index} className="flex gap-2 flex-row-reverse items-end">
                                        <img src="assets/images/avatars/avatar-3.jpg" alt className="w-5 h-5 rounded-full shadow" />
                                        <div className="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">  {value?.message}</div>
                                    </div>
                                )
                            ))}
                            {/* time */}
                            {/* <div className="flex justify-center ">
                                <div className="font-medium text-gray-500 text-sm dark:text-white/70">
                                    April 8,2023,6:30 AM
                                </div>
                            </div> */}
                            {/* sent media*/}
                            {/* <div className="flex gap-2 flex-row-reverse items-end">
                                <img src="assets/images/avatars/avatar-3.jpg" alt className="w-4 h-4 rounded-full shadow" />
                                <a className="block rounded-[18px] border overflow-hidden" href="#">
                                    <div className="max-w-md">
                                        <div className="max-w-full relative w-72">
                                            <div className="relative" style={{ paddingBottom: '57.4286%' }}>
                                                <div className="w-full h-full absolute inset-0">
                                                    <img src="assets/images/product/product-2.jpg" alt className="block max-w-full max-h-52 w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div> */}
                        </div>
                    </div>
                    {/* sending message area */}
                    <div className="flex items-center md:gap-4 gap-2 md:p-3 p-2 overflow-hidden">
                        <div id="message__wrap" className="flex items-center gap-2 h-full dark:text-white -mt-1.5">
                            <button type="button" className="shrink-0">
                                <ion-icon className="text-3xl flex" name="add-circle-outline" />
                            </button>
                            <div className="dropbar pt-36 h-60 bg-gradient-to-t via-white from-white via-30% from-30% dark:from-slate-900 dark:via-900" uk-drop="stretch: x; target: #message__wrap ;animation:  slide-bottom ;animate-out: true; pos: top-left; offset:10 ; mode: click ; duration: 200">
                                <div className="sm:w-full p-3 flex justify-center gap-5" uk-scrollspy="target: > button; cls: uk-animation-slide-bottom-small; delay: 100;repeat:true">
                                    <button type="button" className="bg-sky-50 text-sky-600 border border-sky-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                        <ion-icon className="text-3xl flex" name="image" />
                                    </button>
                                    <button type="button" className="bg-green-50 text-green-600 border border-green-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                        <ion-icon className="text-3xl flex" name="images" />
                                    </button>
                                    <button type="button" className="bg-pink-50 text-pink-600 border border-pink-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                        <ion-icon className="text-3xl flex" name="document-text" />
                                    </button>
                                    <button type="button" className="bg-orange-50 text-orange-600 border border-orange-100 shadow-sm p-2.5 rounded-full shrink-0 duration-100 hover:scale-[1.15] dark:bg-dark3 dark:border-0">
                                        <ion-icon className="text-3xl flex" name="gift" />
                                    </button>
                                </div>
                            </div>
                            <button type="button" className="shrink-0">
                                <ion-icon className="text-3xl flex" name="happy-outline" />
                            </button>
                            <div className="dropbar p-2" uk-drop="stretch: x; target: #message__wrap ;animation: uk-animation-scale-up uk-transform-origin-bottom-left ;animate-out: true; pos: top-left ; offset:2; mode: click ; duration: 200 ">
                                <div className="sm:w-60 bg-white shadow-lg border rounded-xl  pr-0 dark:border-slate-700 dark:bg-dark3">
                                    <h4 className="text-sm font-semibold p-3 pb-0">Send Imogi</h4>
                                    <div className="grid grid-cols-5 overflow-y-auto max-h-44 p-3 text-center text-xl">
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😊 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤩 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😎</div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥳 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😂 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥰 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😡 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😊 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤩 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😎</div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥳 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😂 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥰 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😡 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤔 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😊 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🤩 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😎</div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 🥳 </div>
                                        <div className="hover:bg-secondery p-1.5 rounded-md hover:scale-125 cursor-pointer duration-200"> 😂 </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex-1">
                            <div style={{ display: "flex" }}>
                                <textarea placeholder="Write your message" rows={1} className="w-full resize-none bg-secondery rounded-full px-4 p-2" value={messageValue} onChange={(event) => { setMessageValue(event.target.value) }} />
                                {messageValue && messageValue.trim() != "" && (
                                    <button type="submit" className="text-sm rounded-full py-1.5 px-3.5 bg-secondery" onClick={handleSendMessage}> Send</button>
                                )}
                            </div>
                            <button type="button" className="text-white shrink-0 p-2 absolute right-0.5 top-0">
                                <ion-icon className="text-xl flex" name="send-outline" />
                            </button>
                        </div>
                        <button type="button" className="flex h-full dark:text-white">
                            <ion-icon className="text-3xl flex -mt-3" name="heart-outline" />
                        </button>
                    </div>
                </div >
            )
            }

            {/* user profile right info */}
            < div className="rightt w-full h-full absolute top-0 right-0 z-10 hidden transition-transform" >
                <div className="w-[360px] border-l shadow-lg h-screen bg-white absolute right-0 top-0 uk-animation-slide-right-medium delay-200 z-50 dark:bg-dark2 dark:border-slate-700">
                    <div className="w-full h-1.5 bg-gradient-to-r to-purple-500 via-red-500 from-pink-500 -mt-px" />
                    <div className="py-10 text-center text-sm pt-20">
                        <img src="assets/images/avatars/avatar-3.jpg" className="w-24 h-24 rounded-full mx-auto mb-3" alt />
                        <div className="mt-8">
                            <div className="md:text-xl text-base font-medium text-black dark:text-white"> Monroe Parker</div>
                            <div className="text-gray-500 text-sm mt-1 dark:text-white/80">@Monroepark</div>
                        </div>
                        <div className="mt-5">
                            <a href="timeline.html" className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold bg-secondery">View profile</a>
                        </div>
                    </div>
                    <hr className="opacity-80 dark:border-slate-700" />
                    <ul className="text-base font-medium p-3">
                        <li>
                            <div className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery">
                                <ion-icon name="notifications-off-outline" className="text-2xl" /> Mute Notification
                                <label className="switch cursor-pointer ml-auto"> <input type="checkbox" defaultChecked /><span className="switch-button !relative" /></label>
                            </div>
                        </li>
                        <li> <button type="button" className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"> <ion-icon name="flag-outline" className="text-2xl" /> Report   </button></li>
                        <li> <button type="button" className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"> <ion-icon name="settings-outline" className="text-2xl" /> Ignore messages </button> </li>
                        <li> <button type="button" className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-secondery"> <ion-icon name="stop-circle-outline" className="text-2xl" /> Block  </button> </li>
                        <li> <button type="button" className="flex items-center gap-5 rounded-md p-3 w-full hover:bg-red-50 text-red-500"> <ion-icon name="trash-outline" className="text-2xl" /> Delete Chat </button> </li>
                    </ul>
                    {/* close button */}
                    <button type="button" className="absolute top-0 right-0 m-4 p-2 bg-secondery rounded-full" uk-toggle="target: .rightt ; cls: hidden">
                        <ion-icon name="close" className="text-2xl flex" />
                    </button>
                </div>
                {/* overly */}
                <div className="bg-slate-100/40 backdrop-blur absolute w-full h-full dark:bg-slate-800/40" uk-toggle="target: .rightt ; cls: hidden" />
            </div >

        </>
    )
}

export default MessageFeed