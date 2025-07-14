const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hopdong = new Schema({
  idchutro: String, 
  idhopdong: String,
  idphong: String,
  makt: String,
  ngaybatdau: Date,
  ngayketthuc: Date,
  tiendatcoc: Number,
  trangthai: String
});

module.exports = mongoose.model('Hopdong', Hopdong, 'hopdong');