import React, { useEffect, useState } from 'react'
import Stories from './componants/stories'
import Sidebar from './componants/sidebar'
import StoriesFeed from '../../componants/storiesFeed'
import HiddenModel from '../../componants/hiddenModel'
import { postFeedListRedux } from '../../store/actions/postAction'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'

function Home() {
    const dispatch = useDispatch();
    const [addPostPopup, setAddPostPopup] = useState(0);
    const [previewPostPopup, setPreviewPostPopup] = useState(0);
    const handlePostPopup = () => {
        setAddPostPopup(addPostPopup + 1);
    }
    const handlePreviewPostPopup = () => {
        setPreviewPostPopup(previewPostPopup + 1);
    }
    useEffect(() => {
        dispatch(postFeedListRedux());
    }, [])
    return (
        <>
            <Helmet>
                <title>Socialite | Feed</title>
            </Helmet>
            <main id="site__main" className="2xl:ml-[--w-side]  xl:ml-[--w-side-sm] p-2.5 h-[calc(100vh-var(--m-top))] mt-[--m-top]">
                <div className="lg:flex 2xl:gap-16 gap-12 max-w-[1065px] mx-auto" id="js-oversized">
                    <div className="max-w-[680px] mx-auto">
                        <Stories />
                        <StoriesFeed handlePostPopup={handlePostPopup} handlePreviewPostPopup={handlePreviewPostPopup} />
                    </div>
                    <Sidebar />
                </div>
            </main>
            <HiddenModel handlePostPopup={addPostPopup} handlePreviewPostPopup={previewPostPopup} />
        </>
    )
}

export default Home