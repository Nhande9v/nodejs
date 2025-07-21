const Dien = require('../models/Dien');
const Nuoc = require('../models/Nuoc');
const Phongtro = require('../models/Phongtro');

class DienNuocController {
  // Hiển thị form nhập chỉ số điện
  async showDienForm(req, res) {
    const idphong = req.params.idphong;
    const thang = req.query.thang; 
    const phongtro = await Phongtro.findOne({ idphong });
    let existed = null;
  if (thang) {
    existed = await Dien.findOne({ idphong, thang });
  }
  res.render('dien-form', { phongtro: phongtro ? phongtro.toObject() : null, dien: existed });
}
  // Lưu chỉ số điện
  async submitDien(req, res) {
    const { idphong, thang, chisocu, chisomoi, dongia } = req.body;
    const tiendien = (chisomoi - chisocu) * dongia;
    const existed = await Dien.findOne({ idphong, thang });
    if (existed) {
      // Nếu đã có thì update
      await Dien.updateOne({ idphong, thang }, { chisocu, chisomoi, dongia, tiendien });
    } else {
      await Dien.create({ idphong, thang, chisocu, chisomoi, dongia, tiendien });
    }
    res.redirect('/phongtro');
  }

  // Hiển thị form nhập chỉ số nước
  async showNuocForm(req, res) {
  const idphong = req.params.idphong;
  const thang = req.query.thang;
  const phongtro = await Phongtro.findOne({ idphong });
  let existed = null;
  if (thang) {
    existed = await Nuoc.findOne({ idphong, thang });
  }
  res.render('nuoc-form', { phongtro: phongtro ? phongtro.toObject() : null, nuoc: existed });
}
  // Lưu chỉ số nước
  async submitNuoc(req, res) {
  const { idphong, thang, chisocu, chisomoi, dongia } = req.body;
  const tiennuoc = (chisomoi - chisocu) * dongia;
  const existed = await Nuoc.findOne({ idphong, thang });
  if (existed) {
    await Nuoc.updateOne({ idphong, thang }, { chisocu, chisomoi, dongia, tiennuoc });
  } else {
    await Nuoc.create({ idphong, thang, chisocu, chisomoi, dongia, tiennuoc });
  }
  res.redirect('/phongtro');
}
}

module.exports = new DienNuocController();