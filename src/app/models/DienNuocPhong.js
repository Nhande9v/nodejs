const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DienNuocPhongSchema = new Schema({
  idphong: { type: String, required: true }, // mã phòng
  thang: { type: Number, required: true },
  tienPhong: { type: Number, required: true },
  soDien: { type: Number, required: true },
  soNuoc: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DienNuocPhong', DienNuocPhongSchema, 'diennuocphong');
