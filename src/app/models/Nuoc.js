const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Nuoc = new Schema({
  idphong: String,
  thang: String,
  
  chisomoi: Number,
  dongia: Number,
  
  ngaylap: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nuoc', Nuoc, 'nuoc');