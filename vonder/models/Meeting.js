const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
    roomName: {
        type: String,
        require: [true, 'Room Name is required'],
    },
    capacity: {
        type: Number,
        require: [true, 'Capacity is required'],
    },
    available: {
        type: Boolean,
        default: true,
    }
});

const conference = mongoose.model('meeting', MeetingSchema);
module.exports = conference;