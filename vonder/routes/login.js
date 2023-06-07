const express = require('express');
const router = express.Router();
const monmodel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await monmodel.findOne({ email: email });
        if (!user) {
            res.status(404).json({ 
                error: 'User not found' 
            });
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            res.status(401).json({ 
                error: 'Password does not match' 
            });
        } else {
            const token = jwt.sign({ userId: user._id}, 'your_secret_key');
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({
                message: 'Login successful',
                user: user,
                token: token,
            });
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;