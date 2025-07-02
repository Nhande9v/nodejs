const Hopdong = require('../models/Hopdong');
const Phongtro = require('../models/Phongtro');
const { multipleMongooseToObject } = require('../../util/mongoose');

class HopdongController {
  // Xem hợp đồng của phòng theo idphong
  async viewByRoom(req, res) {
    const idphong = req.params.phongtroId;
    const phongtro = await Phongtro.findOne({ idphong });
    if (!phongtro) return res.send('Không tìm thấy phòng này!');
    // Lấy hợp đồng theo idphong
    const hopdong = await Hopdong.findOne({ idphong: idphong });
    let isMine = false;
    if (hopdong && req.session.user && hopdong.makt === req.session.user.makt) {
      isMine = true;
    }
    res.render('hopdong-phong', { hopdong: hopdong ? hopdong.toObject() : null, phongtro, isMine, isUser: req.session.user && req.session.user.role === 'user' });
  }

   // [GET] /hopdong (danh sách tất cả hợp đồng)
  async listAll(req, res) {
    const hopdongs = await Hopdong.find({});
    res.render('hopdong-list', { hopdongs: multipleMongooseToObject(hopdongs) });
  }

  async detail(req, res) {
    const hopdong = await Hopdong.findById(req.params.id);
    res.render('hopdong-detail', { hopdong: hopdong ? hopdong.toObject() : null });
  }


  // Tạo hợp đồng mới cho phòng (nếu chưa có khách thuê)
  async createForRoom(req, res) {
    if (!req.session.user || req.session.user.role !== 'user') {
      return res.redirect('/login');
    }
    const idphong = req.params.phongtroId;
    const phongtro = await Phongtro.findOne({ idphong });
    if (!phongtro) return res.send('Không tìm thấy phòng này!');
    const hopdong = await Hopdong.findOne({ idphong: idphong });
    if (hopdong) {
      return res.send('Phòng này đã có người thuê!');
    }
    // Tạo hợp đồng mới
    await Hopdong.create({
      idhopdong: 'HD' + Math.floor(Math.random() * 1000000),
      idphong: idphong,
      makt: req.session.user.makt,
      ngaybatdau: new Date(),
      ngayketthuc: null,
      tiendatcoc: req.body.tiendatcoc || 0,
      trangthai: 'Còn hiệu lực'
    });
    res.redirect('/hopdong/phong/' + idphong);
  }
}

module.exports = new HopdongController();