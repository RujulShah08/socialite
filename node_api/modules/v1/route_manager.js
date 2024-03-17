const express = require('express');

const router = express.Router();
const middleware = require('../../middleware/headerValidator');

const userRoutes = require('./user/routes/user_routes')

const postRoutes = require('./post/routes/post_routes')

const chatRoutes = require('./chat/routes/chat_routes')

router.use('/', middleware.extractHeaderLanguage);

router.use('/', middleware.validateHeaderApiKey);

router.use('/', middleware.validateHeaderToken);

router.use('/user-auth/', userRoutes);

router.use('/user-post/', postRoutes);

router.use('/chat/', chatRoutes);

module.exports = router;