const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatRoomSchema = mongoose.Schema({
    sender_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    last_message: {
        type: String,
        default: "",
    },
    is_active: {
        type: String,
        description: "0 : inActive, 1 : Active",
        default: "1",
        enum: ["0", "1"]
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const homeModel = mongoose.model('tbl_chat_room', chatRoomSchema, 'tbl_chat_room');
module.exports = homeModel;