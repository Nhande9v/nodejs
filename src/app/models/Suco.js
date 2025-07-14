const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Suco = new Schema({
  idchutro: String,
  idphong: String, 
  idsuco: String,
  makt: String,
  mota: String,
  ngaybaocao: Date,
  tensuco : String,
  trangthai : String
});

module.exports = mongoose.model('Suco', Suco, 'suco');