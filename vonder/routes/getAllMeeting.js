const express = require('express');
const router = express.Router();
const conference = require('../models/Meeting');

router.get('/', async (req, res) => {
    try {
        const meetings = await conference.find();
        res.json(meetings);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Meeting creation failed' });
    }
});

module.exports = router;