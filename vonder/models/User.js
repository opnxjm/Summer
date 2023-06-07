const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Name is required'],
  },
  email: {
    type: String,
    require: [true, 'Email is required'],
  },
  password: {
    type: String,
    require: [true, 'Password is required'],
  },
});

const monmodel = mongoose.model('user', UserSchema);
module.exports = monmodel;
