import React, { useEffect, useState } from 'react'
import MessageFeed from './componants/messageFeed'
import MessageSidebar from './componants/messageSidebar'
import { Helmet } from 'react-helmet'
import { useDispatch } from 'react-redux'
import { chatListingRedux } from '../../store/actions/chatAction'
function Messages() {
    const dispatch = useDispatch();
    const [userChatRoomId, setUserChatRoomId] = useState(null);
    const [receiverData, setReceiverData] = useState(null);
    const [isMessageSent, setIsMessageSent] = useState(0);
    const userChatRoomIdFun = (id, receiver_data) => {
        setReceiverData(receiver_data.user);
        setUserChatRoomId(id);
    }
    const isMessageSentFun = () => {
        console.log("callling");
        setIsMessageSent(prevValue => prevValue + 1);
        // setIsMessageSent(isMessageSent + 1);
    }
    useEffect(() => {
        if (userChatRoomId) {
            let request = {
                chat_room_id: userChatRoomId
            }
            dispatch(chatListingRedux(request));
        }
    }, [userChatRoomId])
    return (
        <>
            <Helmet>
                <title>Socialite | Messages</title>
            </Helmet>
            <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
                <div className="relative overflow-hidden border -m-2.5 dark:border-slate-700">
                    <div className="flex bg-white dark:bg-dark2">
                        <MessageSidebar userChatRoomIdFun={userChatRoomIdFun} isMessageSent={isMessageSent} />
                        <MessageFeed userChatRoomId={userChatRoomId} receiverData={receiverData} isMessageSentFun={isMessageSentFun} />
                    </div>
                </div>
            </main>

        </>
    )
}

export default Messages