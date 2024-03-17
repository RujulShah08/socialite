const randtoken = require('rand-token').generator();
const common = require("../../../../config/common");
const lang = require("../../../../config/language");
const Codes = require("../../../../config/status_codes");
const userSchema = require("../../../schema/user_schema");
const chatSchema = require("../../../schema/chat_schema");
const chatRoomSchema = require("../../../schema/chat_room_schema");
const middleware = require("../../../../middleware/headerValidator");
const template = require("../../../../config/template");
const redis = require("../../../../config/redis");
const mongoose = require('mongoose');

const chat_model = {
    async send_message(req, res) {
        const checkMessage = await chat_model.checkMessage(req);
        var chat = {
            sender_id: req.sender_id,
            receiver_id: req.receiver_id,
            message: req.message,
            message_type: 'text',
            is_read: 0
        }
        if (checkMessage.length > 0) {
            chat.chat_room_id = checkMessage[0].id;
            const newChat = new chatSchema(chat);
            newChat.save().then(response_chat => {
                return middleware.sendResponse(res, Codes.SUCCESS, lang[req.language].rest_keywords_success_message, response_chat);
            }).catch((error) => {
                return middleware.sendResponse(res, Codes.ERROR, lang[req.language].rest_keywords_addpostdata_error_message, error);
            });
        } else {
            var chat_room = {
                sender_id: req.sender_id,
                receiver_id: req.receiver_id,
            }
            const newChatRoom = new chatRoomSchema(chat_room);
            newChatRoom.validate().then(() => {
                newChatRoom.save().then(response => {
                    chat.chat_room_id = response.id;
                    const newChat = new chatSchema(chat);
                    newChat.save().then(response_chat => {
                        return middleware.sendResponse(res, Codes.SUCCESS, lang[req.language].rest_keywords_success_message, response_chat);
                    }).catch((error) => {
                        return middleware.sendResponse(res, Codes.ERROR, lang[req.language].rest_keywords_addpostdata_error_message, error);
                    });
                }).catch((error) => {
                    return middleware.sendResponse(res, Codes.ERROR, lang[req.language].rest_keywords_addpostdata_error_message, error);
                });
            }).catch((error) => {
                console.log('error: ', error);
                return middleware.sendResponse(res, Codes.INTERNAL_ERROR, lang[req.language].rest_keywords_err_message, error);
            });
        }
    },
    async send_message_socket(req) {
        try {
            const checkMessage = await chat_model.checkMessage(req);
            var chat = {
                sender_id: req.sender_id,
                receiver_id: req.receiver_id,
                message: req.message,
                message_type: 'text',
                is_read: 0
            }
            if (checkMessage.length > 0) {
                chat.chat_room_id = checkMessage[0].id;
                const newChat = new chatSchema(chat);

                const response_chat = await newChat.save();
                const update_chatroom = await chatRoomSchema.updateOne(
                    { _id: checkMessage[0].id },
                    { last_message: req.message }
                )
                return response_chat;
            } else {
                var chat_room = {
                    sender_id: req.sender_id,
                    receiver_id: req.receiver_id,
                    last_message: req.message
                }
                const newChatRoom = new chatRoomSchema(chat_room);

                await newChatRoom.validate();

                const response = await newChatRoom.save();
                chat.chat_room_id = response.id;

                const newChat = new chatSchema(chat);
                const response_chat = await newChat.save();

                return response_chat;
            }
        } catch (error) {
            console.log('error: ', error);
            return error;
        }
    },

    async chat_listing(req, res) {
        const result = await chatSchema.find({
            chat_room_id: req.chat_room_id,
            is_active: 1,
            is_deleted: 0
        });
        if (result.length > 0) {
            let receiver_id = ""
            if (result[0].sender_id == req.user_id) {
                receiver_id = result[0].receiver_id;
            } else {
                receiver_id = result[0].sender_id;
            }
            const reciver_data = await userSchema.find({
                _id: receiver_id,
                is_active: 1,
                is_deleted: 0
            });
            return await middleware.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], { chat_data: result, receiver_data: reciver_data })
        } else {
            return await middleware.sendResponse(res, Codes.ERROR, lang[req.language].rest_keywords_no_data_message, null);
        }
    },
    async search_user(req, res) {
        let userId = new mongoose.Types.ObjectId(req.user_id);
        const result = await userSchema.aggregate([
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                { first_name: { $regex: new RegExp(req.search, 'i') } },
                                { last_name: { $regex: new RegExp(req.search, 'i') } }
                            ]
                        },
                        { _id: { $ne: userId } }
                    ]
                }
            },
            {
                $lookup: {
                    from: "tbl_chat_room",
                    let: { userId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        {
                                            $or: [
                                                {
                                                    $and: [
                                                        { $eq: ["$sender_id", "$$userId"] },
                                                        { $eq: ["$receiver_id", userId] }
                                                    ]
                                                },
                                                {
                                                    $and: [
                                                        { $eq: ["$sender_id", userId] },
                                                        { $eq: ["$receiver_id", "$$userId"] }
                                                    ]
                                                }
                                            ]
                                        },
                                        { $eq: ["$is_active", "1"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1
                            }
                        }
                    ],
                    as: "chat_rooms"
                }
            },
            {
                $project: {
                    _id: 1,
                    user: {
                        _id: "$_id",
                        first_name: "$first_name",
                        last_name: "$last_name",
                        profile_image: "$profile_image"
                    },
                    chat_rooms: "$chat_rooms"
                }
            }
        ]);

        if (result.length > 0) {
            return await middleware.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], result)
        } else {
            return await middleware.sendResponse(res, Codes.ERROR, lang[req.language].rest_keywords_no_data_message, null);
        }
    },
    async user_list_for_chat(req, res) {
        let userId = new mongoose.Types.ObjectId(req.user_id);
        let result = [];
        const result1 = await chatRoomSchema.aggregate([
            {
                $match: {
                    is_active: "1",
                    sender_id: userId
                }
            },
            {
                $lookup: {
                    from: 'tbl_user',
                    localField: 'receiver_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    'user._id': 1,
                    'user.first_name': 1,
                    'user.last_name': 1,
                    'user.profile_image': 1,
                    'last_message': 1,
                    'is_active': 1
                }
            }
        ]);
        const result2 = await chatRoomSchema.aggregate([
            {
                $match: {
                    is_active: "1",
                    receiver_id: userId
                }
            },
            {
                $lookup: {
                    from: 'tbl_user',
                    localField: 'sender_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    'user._id': 1,
                    'user.first_name': 1,
                    'user.last_name': 1,
                    'user.profile_image': 1,
                    'last_message': 1,
                    'is_active': 1
                }
            }
        ]);
        if (result1.length > 0) {
            result.push(...result1);
        }
        if (result2.length > 0) {
            result.push(...result2);
        }
        console.log('result', result);
        if (result.length > 0) {
            return await middleware.sendResponse(res, Codes.SUCCESS, lang[req.language]['text_home_get_data'], result)
        } else {
            return await middleware.sendResponse(res, Codes.ERROR, lang[req.language].rest_keywords_no_data_message, null);
        }
    },
    async checkMessage(req) {
        const result = await chatRoomSchema.find({
            $or: [
                { sender_id: req.sender_id, receiver_id: req.receiver_id },
                { sender_id: req.receiver_id, receiver_id: req.sender_id }
            ]
        });
        return result;
    },
}

module.exports = chat_model;
