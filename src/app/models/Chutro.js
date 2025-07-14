const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chutro = new Schema({
  ten: String,
  email: String,
  pass: String,
  sdt: String,
  diachi: String,
  idchutro: String,
  stk: String,        
  nganhang: String,    
  qr: String     
});

module.exports = mongoose.model('Chutro', Chutro, 'chutro');