const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DienNuocSchema = new Schema({
  phong: { type: String, ref: 'Phongtro', required: true },
  thang: { type: Number, required: true },
  nam: { type: Number, required: true },
  soDien: { type: Number, required: true },
  soNuoc: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DienNuoc', DienNuocSchema);
