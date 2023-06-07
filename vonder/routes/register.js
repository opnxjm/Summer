const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const monmodel = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);
    const user = new monmodel({
      name: name,
      email: email,
      password: hash,
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, 'your_secret_key');
    res.cookie('token', token, { httpOnly: true });
    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
