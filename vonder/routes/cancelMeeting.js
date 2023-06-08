const express = require('express');
const router = express.Router();
const conference = require('../models/Meeting');
const StatusRoom = require('../models/StatusRoom');

router.delete('/', async (req, res) => {
    const roomName = req.body.roomName;
    const startDateTime = req.body.startDateTime;
    try {
        const room = await conference.findOne({ roomName: roomName });
        if (!room) {
            res.status(404).json({
                message: 'Room not found'
            });
        }
        console.log('hi');
        const reservation = await StatusRoom.findOne({ room: room._id, startDateTime: startDateTime });
        if (!reservation) {
            res.status(404).json({
                message: 'Reservation not found'
            });
        }
        await StatusRoom.deleteOne({ room: room._id, startDateTime: startDateTime });
        await conference.findOneAndUpdate({ roomName: roomName }, { $set: { available: true } });
        res.json({
            message: 'Reservation cancelled successfully'
        });
    } catch (err) {
        res.status(500).json({
            error: 'Reservation cancellation failed'
        });
    }
});

module.exports = router;