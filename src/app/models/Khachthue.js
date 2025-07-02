const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Khachthue = new Schema({
  cccd: String,
  email: String,
  pass: String,
  sdt: String,
  ten: String,
  makt: String,
   role: { type: String, default: 'user' }
});

module.exports = mongoose.model('Khachthue', Khachthue, 'khachthue');