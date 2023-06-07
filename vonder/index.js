const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const createMeetingRouter = require('./routes/createMeeting');
const getAllMeetingRouter = require('./routes/getAllMeeting');
const verifyToken = require('./middleware/verifyToken');
const getOneMeetingRouter = require('./routes/getOneMeeting');
const checkAvailableRouter = require('./routes/checkMeeting');

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect('mongodb://localhost:27017/try', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/createMeeting', verifyToken, createMeetingRouter);
app.use('/getAllMeeting', verifyToken, getAllMeetingRouter);
app.use('/getOneMeeting', verifyToken, getOneMeetingRouter);
app.use('/checkAvailable', verifyToken, checkAvailableRouter);


app.listen(5555, () => {
  console.log('App listening on port 5555');
});
