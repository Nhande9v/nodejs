const Hopdong = require('../models/Hopdong');
const Phongtro = require('../models/Phongtro');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Suco = require('../models/Suco');

class SucoController {
   async showForm(req, res) {
    const idphong = req.params.idphong;
    const makt = req.session.user?.makt;

    const hopdong = await Hopdong.findOne({ idphong, makt });
    if (!hopdong) {
      return res.status(403).send('Bạn không có quyền báo cáo sự cố phòng này.');
    }

    res.render('baocao-form', {
      idphong,
    });
  }

  async submit(req, res) {
    const idphong = req.params.idphong;
    const makt = req.session.user?.makt;
    const { tensuco, mota } = req.body;

    const hopdong = await Hopdong.findOne({ idphong, makt });
    if (!hopdong) {
      return res.status(403).send('Không thể gửi báo cáo vì bạn không sở hữu phòng này.');
    }

    await Suco.create({
      idchutro : hopdong.idchutro,
      idphong,
      idsuco: 'SC' + Math.floor(Math.random() * 1000000),
      makt,
      tensuco,
      mota,
      ngaybaocao: new Date(), // ngày hiện tại
      trangthai: 'Chờ xử lý'
      
    });
   
    req.session.successMessage = 'Gửi báo cáo sự cố thành công!';
    res.redirect('/my/hopdong');
  }

  async listForChutro(req, res) {
  const idchutro = req.session.user?.idchutro;
  if (!idchutro) return res.status(403).send('Bạn không có quyền truy cập.');

  const sucos = await Suco.find({ idchutro });
  res.render('suco-list', { sucos: multipleMongooseToObject(sucos) });
}
// Đánh dấu đã xử lý
async markAsResolved(req, res) {
  const idsuco = req.params.idsuco;
  await Suco.updateOne({ idsuco }, { trangthai: 'Đã xử lý' });
  res.redirect('/suco'); // quay lại danh sách sự cố
}

}

module.exports = new SucoController;


