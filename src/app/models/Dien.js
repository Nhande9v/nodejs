const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dien = new Schema({
  idphong: String,
  thang: String,
  chisocu: Number,
  chisomoi: Number,
  dongia: Number,
  tiendien: Number,
  ngaylap: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dien', Dien, 'dien');