const express = require('express');
const router = express.Router();
const conference = require('../models/Meeting');
const StatusRoom = require('../models/StatusRoom');
const monmodel = require('../models/User');

router.post('/', async (req, res) => {
    const name = req.body.name;
    const roomName = req.body.roomName;
    const startDateTime = req.body.startDateTime;
    const endDateTime = req.body.endDateTime;
    try {
        const room = await conference.findOne({ roomName: roomName });
        // Check if room exists
        if (!room) {
            res.status(404).json({
                message: 'Room not found'
            });
        }
        // Check if room is available
        const overlappingReservations = await StatusRoom.find({
            room: room._id,
            $or: [
                // Reservation starts before the provided start time and ends after the provided end time
                { startDateTime: { $lt: endDateTime }, endDateTime: { $gt: startDateTime } },
                // Reservation starts during the provided start and end times
                { startDateTime: { $gte: startDateTime, $lte: endDateTime } },
            ]
        });
        if (overlappingReservations.length > 0) {
            res.status(400).json({
                message: 'Room is not available'
            });
        }

        const existingReservation = await StatusRoom.findOne({
            room: room._id,
            startDateTime: startDateTime,
            endDateTime: endDateTime
        });
        if (existingReservation) {
            return res.status(400).json({
                message: 'The room is already reserved for the given time range'
            });
        }

        // Can reserve room
        // Find user
        const findUser = await monmodel.findOne({ name: name });
        if (!findUser) {
            res.status(404).json({
                message: 'User not found'
            });
        }

        const reservation = new StatusRoom({
            room: room._id,
            user: findUser._id,
            startDateTime: startDateTime,
            endDateTime: endDateTime
        });

        await reservation.save();

        //Update available field
        await conference.findOneAndUpdate(
            { roomName: roomName },
            { $set: { available: false } }
        );

        res.json({
            message: 'Room reserved',
            reservation
        });
    } catch (err) {
        res.status(500).json({
            error: 'An error occurred while checking available rooms.'
        });
    }
});

module.exports = router;
