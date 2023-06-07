const express = require('express');
const router = express.Router();
const conference = require('../models/Meeting');
const StatusRoom = require('../models/StatusRoom');


router.get('/', async (req, res) => {
  try {
    const { startDateTime, endDateTime } = req.query;

    // Find reservations that overlap with the provided start and end times
    const overlappingReservations = await StatusRoom.find({
      $or: [
        // Reservation starts before the provided start time and ends after the provided end time
        { startDateTime: { $lt: endDateTime }, endDateTime: { $gt: startDateTime } },
        // Reservation starts during the provided start and end times
        { startDateTime: { $gte: startDateTime, $lte: endDateTime } },
      ],
    }).select('conference');

    // Get IDs of the reserved meeting rooms
    const reservedRoomIds = overlappingReservations.map(reservation => reservation.conference);

    const availableRooms = await conference.find({ _id: { $nin: reservedRoomIds } });

    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while checking available rooms.' });
  }
});

module.exports = router;
