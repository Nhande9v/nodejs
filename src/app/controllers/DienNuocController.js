const DienNuoc = require('../models/DienNuoc');
const { index } = require('./PhongtroController');
const Phongtro = require('../models/Phongtro');
const DienNuocPhong = require('../models/DienNuocPhong');
const{mongooseToObject} = require('../../util/mongoose');

class dienNuocController {
  index(req, res) {
    res.render('them-dienNuoc');
  }
  // [POST] /diennuoc/add
  async create(req, res) {

    try {
      const formData = req.body;
      const phongObj = await Phongtro.findOne({ idphong: formData.phong }); // maPhong là trường mã phòng
      if (!phongObj) {
        return res.status(400).json({ message: 'Không tìm thấy phòng' });
      }
      const thang = parseInt(formData.thang);
      const nam = parseInt(formData.nam);
      let thangTruoc = thang - 1;
      let namTruoc = nam;
      if (thangTruoc === 0) {
        thangTruoc = 12;
        namTruoc = nam - 1;
      }
      const thangTruocData = await DienNuoc.findOne({
        phong: formData.phong,
        thang: thangTruoc,
        nam: namTruoc
      });
      if(!thangTruocData){

      }else{
const soDienCu = thangTruocData.soDien;
      const soNuocCu = thangTruocData.soNuoc;

      const soDienMoi = parseInt(formData.soDien);
      const soNuocMoi = parseInt(formData.soNuoc);

      const dienTieuThu = (soDienMoi - soDienCu) * 3000;
      const nuocTieuThu = (soNuocMoi - soNuocCu) * 5000;

      const dienNuocPhong = new DienNuocPhong({
        idphong: formData.phong,
        thang: formData.thang,
        tienPhong: phongObj.tiendatcoc,
        soDien: dienTieuThu,
        soNuoc: nuocTieuThu,
      });
      dienNuocPhong.save();
      }
      
      const dienNuoc = new DienNuoc({
        phong: formData.phong,
        thang: formData.thang,
        nam: formData.nam,
        soDien: formData.soDien,
        soNuoc: formData.soNuoc,
      });
      dienNuoc.save();

      res.render('them-dienNuoc', { success: 'Thêm điện nước thành công!' });
    } catch (error) {
      res.render('them-dienNuoc', { error: 'Lỗi khi thêm điện nước!' });
    }
  }
  async showForm(req, res) {
    const idphong = req.params.idphong;
    const makt = req.session.user?.makt;
    const thang = req.query.thang;

    res.render('chonthang', {
      idphong,
      thang,
    });
  }
  async chitiet(req, res, next) {
    const idphong = req.params.idphong;
    const makt = req.session.user?.makt;
    const thang = req.params.thang;

    DienNuocPhong.findOne({ idphong, thang })
      .then(dienNuocPhong => {
        res.render('hoadon-form', {
          idphong,
          thang,
          dienNuocPhong: mongooseToObject(dienNuocPhong),
        });
      })
    .catch (next);
  }
}


module.exports = new dienNuocController;