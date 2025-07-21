const Dien = require('../models/Dien');
const Nuoc = require('../models/Nuoc');
const Hoadon = require('../models/Hoadon');
const Phongtro = require('../models/Phongtro');
const { multipleMongooseToObject } = require('../../util/mongoose');

class HoadonController {
  // Hiển thị form tạo hóa đơn
  async showForm(req, res) {
    const idphong = req.params.idphong;
    const phongtro = await Phongtro.findOne({ idphong });
      // Lấy tháng từ query nếu có
  const thang = req.query.thang;
  let existed = null;
  if (thang) {
    existed = await Hoadon.findOne({ idphong, thang });
  }
  res.render('hoadon-form', { phongtro: phongtro ? phongtro.toObject() : null, existed, thang });
  }

  // Tạo hóa đơn tổng hợp
  async create(req, res) {
    const { idphong, thang } = req.body;
    // Lấy tiền điện, nước theo tháng/phòng
    const dien = await Dien.findOne({ idphong, thang });
    const nuoc = await Nuoc.findOne({ idphong, thang });
    const phongtro = await Phongtro.findOne({ idphong });

     if (!dien || !nuoc || !phongtro) {
      return res.send('Chưa có đủ dữ liệu điện, nước hoặc phòng!');
    }
    const tiendien = dien.tiendien;
    const tiennuoc = nuoc.tiennuoc;
    const tienthuephong = phongtro.tiendatcoc;
    const tongtien = tiendien + tiennuoc + tienthuephong;

    const existed = await Hoadon.findOne({ idphong, thang });
  if (existed) {
    // Nếu đã có thì cập nhật lại hóa đơn
    await Hoadon.updateOne({ idphong, thang }, {
      tiendien, tiennuoc, tienthuephong, tongtien
    });
    return res.redirect(`/hoadon/${idphong}`);
  }
    await Hoadon.create({
      idphong,
      thang,
      tiendien,
      tiennuoc,
      tienthuephong,
      tongtien
    });
    
    // Cập nhật trạng thái phòng thành "Đã thanh toán"
    await Hoadon.updateOne({ idphong, thang }, { trangthai: "Đã thanh toán" });

    res.redirect(`/hoadon/${idphong}`);
  }

  // Xem hóa đơn của phòng
  async detail(req, res) {
    const idphong = req.params.idphong;
    const hoadons = await Hoadon.find({ idphong }).sort({ ngaylap: -1 });
    
    res.render('hoadon-detail', { hoadons : multipleMongooseToObject(hoadons), isAdmin: req.session.user?.role === 'admin', user: req.session.user,   });
  }

  // Xác nhận đã thanh toán
   async confirmPayment(req, res) {
    // SỬA ĐỔI Ở ĐÂY: Lấy 'idphong' từ params và 'thang' từ query
    const { idphong } = req.params;
    const { thang } = req.query; 

    if (!thang) {
        return res.status(400).send('Thiếu thông tin tháng để xác nhận.');
    }

    try {
        await Hoadon.updateOne({ idphong, thang }, { trangthai: 'Đã thanh toán' });
        res.redirect(`/hoadon/${idphong}`);
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).send('Có lỗi xảy ra khi xác nhận thanh toán.');
    }
  }
}

module.exports = new HoadonController();