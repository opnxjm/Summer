const express = require('express');
const router = express.Router();
const conference = require('../models/Meeting');

router.post('/', async (req, res) => {
    try {
        const roomName = req.body.roomName;
        const capacity = req.body.capacity;
        const meeting = new conference({
            roomName: roomName,
            capacity: capacity,
        });
        await meeting.save();
        res.json(meeting);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Meeting creation failed' });
    }
});

module.exports = router;