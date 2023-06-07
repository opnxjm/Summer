const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatusRoomSchema = new Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    }
});
const StatusRoom = mongoose.model('StatusRoom', StatusRoomSchema);
module.exports = StatusRoom;