const Hopdong = require('../models/Hopdong');
const Hoadon = require('../models/Hoadon');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose'); 

class MyController {

  // Xem hợp đồng của phòng theo makt
  async myhopdong(req, res) {
     if (!req.session.user || !req.session.user.makt) {
    return res.status(401).send("Bạn chưa đăng nhập hoặc thông tin không hợp lệ.");
  }

  try {
    const hopdong = await Hopdong.find({ makt: req.session.user.makt });
    const successMessage = req.session.successMessage;
    req.session.successMessage = null;
    res.render('my/hopdong', { hopdong: multipleMongooseToObject(hopdong), successMessage });
  } catch (err) {
    next(err);
  }


  }

  async myhoadon(req, res) {
    // Lấy hợp đồng của khách thuê đang đăng nhập
    const makt = req.session.user?.makt;
    const hopdong = await Hopdong.findOne({ makt, trangthai: 'Còn hiệu lực' });
    if (!hopdong) {
      return res.send('Bạn chưa thuê phòng nào hoặc hợp đồng đã hết hiệu lực.');
    }
    // Lấy hóa đơn của phòng đó
    const hoadons = await Hoadon.find({ idphong: hopdong.idphong }).sort({ ngaylap: -1 });
    res.render('hoadon-detail', { hoadons: multipleMongooseToObject(hoadons) });
  }
}

module.exports = new MyController() ;


