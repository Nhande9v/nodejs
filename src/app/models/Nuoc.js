const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Nuoc = new Schema({
  idphong: String,
  thang: String,
  chisocu: Number,
  chisomoi: Number,
  dongia: Number,
  tiennuoc: Number,
  ngaylap: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nuoc', Nuoc, 'nuoc');