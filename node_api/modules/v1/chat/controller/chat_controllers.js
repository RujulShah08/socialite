const chatModel = require("../models/chat_model");
const Codes = require("../../../../config/status_codes");
const middleware = require("../../../../middleware/headerValidator");
const validationRules = require('../chat_validation_rules');

const send_message = async (req, res) => {
    const request = await middleware.decryption(req);
    // const request = req.body;
    const valid = await middleware.checkValidationRules(request, validationRules.sendMessageValidation)

    if (valid.status) {
        return chatModel.send_message(request, res)
    } else {
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
}
const chat_listing = async (req, res) => {
    const request = await middleware.decryption(req);
    // const request = req.body;
    const valid = await middleware.checkValidationRules(request, validationRules.chatListingValidation)

    if (valid.status) {
        return chatModel.chat_listing(request, res)
    } else {
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
}
const search_user = async (req, res) => {
    const request = await middleware.decryption(req);
    // const request = req.body;
    const valid = await middleware.checkValidationRules(request, validationRules.searchUserValidation)

    if (valid.status) {
        return chatModel.search_user(request, res)
    } else {
        return middleware.sendResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
}
const user_list_for_chat = async (req, res) => {
    return chatModel.user_list_for_chat(req, res)
}
module.exports = {
    send_message, chat_listing, user_list_for_chat, search_user
}