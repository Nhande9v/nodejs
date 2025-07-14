const Hopdong = require('../models/Hopdong');
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

    // const hopdongs = await Hopdong.find({ makt: req.session.user.makt });
    // res.render('hopdong-my', { hopdongs: multipleMongooseToObject(hopdongs) });
  }

}

module.exports = new MyController() ;


