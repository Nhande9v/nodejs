const Hopdong = require('../models/Hopdong');
const Phongtro = require('../models/Phongtro');
const Chutro = require('../models/Chutro');

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
    let chutro = null;
    if (phongtro && phongtro.idchutro) {
  chutro = await Chutro.findOne({ idchutro: phongtro.idchutro });
}
    
  const isUser = req.session.user && req.session.user.role === 'user';
  const isAdmin = req.session.user && req.session.user.role === 'admin';
    // Kiểm tra xem người dùng có phải là chủ trọ của phòng này không
  res.render('hopdong-phong', {
  hopdong: hopdong ? hopdong.toObject() : null,
  phongtro: phongtro ? phongtro.toObject() : null,
  chutro: chutro ? chutro.toObject() : null,
  isMine, isUser, isAdmin
});

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
    const idchutro = phongtro.idchutro;

    // Tạo hợp đồng mới
    await Hopdong.create({
      idhopdong: 'HD' + Math.floor(Math.random() * 1000000),
      idphong: idphong,
      makt: req.session.user.makt,
      idchutro: idchutro,
      ngaybatdau: new Date(),
      ngayketthuc: null,
      tiendatcoc: req.body.tiendatcoc || 0,
      trangthai: 'Chờ xác nhận'
      // trangthai: 'Còn hiệu lực'
    });
    
    res.redirect('/hopdong/phong/' + idphong);
  }

  // Hiển thị form tạo hợp đồng cho chủ trọ
async showCreateForm(req, res) {
  const idphong = req.params.phongtroId;
  const phongtro = await Phongtro.findOne({ idphong });
  if (!phongtro) return res.send('Không tìm thấy phòng này!');
   
  //
  res.render('hopdong-tao-admin', { phongtro: phongtro.toObject() });
}

// Tạo hợp đồng mới cho chủ trọ (admin)
async   createByAdmin(req, res) {
  const idphong = req.params.phongtroId;
  const { makt, ngaybatdau, ngayketthuc } = req.body;

  //  Lấy phòng để truy xuất giá
  const phong = await Phongtro.findOne({ idphong });
  if (!phong) return res.send('Không tìm thấy phòng này!');

     //  Lấy id chủ trọ từ session
  const idchutro = req.session.user?.idchutro;
  if (!idchutro) return res.status(401).send('Không xác định được chủ trọ.');

  // Tiền đặt cọc lấy theo giá phòng
  const tiendatcoc = phong.tiendatcoc;

  await Hopdong.create({
    idhopdong: 'HD' + Math.floor(Math.random() * 1000000),
    idphong,
    idchutro,
    makt,
    ngaybatdau,
    ngayketthuc,
    tiendatcoc,  
    trangthai: 'Còn hiệu lực'
  });
  // Cập nhật trạng thái phòng thành "Đã thuê"
  await Phongtro.updateOne({ idphong }, { trangthai: "Đã thuê" });
  res.redirect('/phongtro');
}
  async deleteHopdong(req, res) {
      await Hopdong.deleteOne({ idhopdong: req.params.idhopdong });
      res.redirect('/hopdong');
    }

  async requestRent(req, res) {
  if (!req.session.user || req.session.user.role !== 'user') {
    return res.redirect('/login');
  }
  // KHÔNG cần lưu vào YeuCauThue, chỉ hiển thị thông báo
  const idphong = req.params.phongtroId;
  const phongtro = await Phongtro.findOne({ idphong });
  const chutro = phongtro && phongtro.idchutro
    ? await Chutro.findOne({ idchutro: phongtro.idchutro })
    : null;
  res.render('hopdong-phong', {
    phongtro: phongtro ? phongtro.toObject() : null,
    chutro: chutro ? chutro.toObject() : null,
    successMessage: 'Đã gửi xác nhận thuê phòng. Chủ trọ sẽ kiểm tra chuyển khoản và tạo hợp đồng cho bạn!'
  });
}
}

module.exports = new HopdongController();