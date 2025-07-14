const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Phongtro = new Schema({
  tenphong: String,
  trangthai: String,
  idphong: String,
  tiendatcoc: Number,
  img : String,
  idchutro: String
});

module.exports = mongoose.model('Phongtro', Phongtro, 'phongtro');
