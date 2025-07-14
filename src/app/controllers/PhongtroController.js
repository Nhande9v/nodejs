const PhongTro = require('../models/Phongtro');
const Hopdong = require('../models/Hopdong');
const { multipleMongooseToObject , mongooseToObject  } = require('../../util/mongoose');

class PhongTroController {
  // [GET] /phongtro
  async index(req, res) {
    try {
      const phongtro = await PhongTro.find({});
      // Lấy hợp đồng của từng phòng
      const hopdongs = await Hopdong.find({});
      const hopdongMap = {};
      hopdongs.forEach(hd => { hopdongMap[hd.idphong] = hd; });
      res.render('phongtro', {
        phongtro: multipleMongooseToObject(phongtro),
        hopdongMap,
        isAdmin: req.session.user && req.session.user.role === 'admin'
      });
    } catch (err) {
      res.status(500).send('Lỗi server');
    }
  }

  showAddForm(req, res) {
    res.render('phongtro-them');
  }
  
 
  
  async addRoom(req, res) {
      const { tenphong, trangthai, idphong, tiendatcoc,img } = req.body;
      const idchutro = req.session.user?.idchutro; // Lấy idchutro từ session của admin
      if (!idchutro) {
        return res.status(401).send('Không xác định được chủ trọ để thêm phòng.');
      }
      await PhongTro.create({ tenphong, trangthai, idphong, tiendatcoc,img, idchutro}); // Lưu idchutro
      res.redirect('/phongtro');
    }

  async editRoom(req, res) {
    const phongtro = await PhongTro.findOne({ idphong: req.params.idphong });
    res.render('phongtro-edit', { phong: mongooseToObject(phongtro) });
  }

  async updateRoom(req, res) {
    await PhongTro.updateOne({ idphong: req.params.idphong }, req.body);
    res.redirect('/phongtro');
  }
  async deleteRoom(req, res) {
    await PhongTro.deleteOne({ idphong: req.params.idphong });
    res.redirect('/phongtro');
  }
}

module.exports = new PhongTroController();