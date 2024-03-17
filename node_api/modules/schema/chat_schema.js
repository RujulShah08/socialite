const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = mongoose.Schema({
    chat_room_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    message_type: {
        type: String,
        enum: ["text", "other"],
        default: "text"
    },
    is_read: {
        type: String,
        description: "0 : unread, 1 : read",
        enum: ["0", "1"],
        default: "0"
    },
    is_active: {
        type: String,
        description: "0 : inActive, 1 : Active",
        default: "1",
        enum: ["0", "1"]
    },
    is_deleted: {
        type: String,
        description: "0 : Not Deleted, 1 : Delete ",
        default: "0",
        enum: ["0", "1"]
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const homeModel = mongoose.model('tbl_chat', chatSchema, 'tbl_chat');
module.exports = homeModel;