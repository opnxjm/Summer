const express = require('express');
const router = express.Router();
const conference = require('../models/Meeting');

router.get('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const room = await conference.find({ roomName: name });
        if (!room) {
            res.status(404).json({ 
                error: 'Meeting not found' 
            });
        }
        res.json(room);
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            error: 'Meeting creation failed' 
        });
    }
});

module.exports = router;