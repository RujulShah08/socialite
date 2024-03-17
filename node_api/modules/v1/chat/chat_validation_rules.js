const checkValidatorRules = {

    sendMessageValidation: {
        sender_id: 'required',
        receiver_id: 'required',
        message: 'required'
    },
    chatListingValidation: {
        page: '',
        chat_room_id: 'required'
    },
    searchUserValidation: {
        search: 'required'
    },
}

module.exports = checkValidatorRules;

