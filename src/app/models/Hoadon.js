const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hoadon = new Schema({
  idhoadon: String,
  idphong: String,
  thang: String, 
  tiendien: Number,
  tiennuoc: Number,
  tienthuephong: Number,
  tongtien: Number,
  ngaylap: { type: Date, default: Date.now },
  trangthai: { type: String, default: 'Chưa thanh toán' }
});

module.exports = mongoose.model('Hoadon', Hoadon, 'hoadon');