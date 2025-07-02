const PhongTro = require('../models/Phongtro');

class PhongTroController {
  // [GET] /phongtro
  async index(req, res) {
    try {
      const phongtro = await PhongTro.find({});
      res.render('phongtro', { phongtro });
    } catch (err) {
      res.status(500).send('Lỗi server');
    }
  }
}

module.exports = new PhongTroController();


