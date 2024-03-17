const express = require('express')

const router = express.Router()
const chatController = require('../controller/chat_controllers');

router.post('/send-message', chatController.send_message);

router.post('/chat-listing', chatController.chat_listing);

router.post('/user-list-for-chat', chatController.user_list_for_chat);

router.post('/search-user', chatController.search_user);

module.exports = router;
