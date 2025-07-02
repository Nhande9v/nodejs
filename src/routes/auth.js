const express = require('express');
const router = express.Router();
const Khachthue = require('../app/models/Khachthue');

router.get('/dang-ky', (req, res) => {
  res.render('register');
});
// Xử lý đăng ký
router.post('/dang-ky', async (req, res) => {
  try {
    const { ten, email, matKhau, sdt, cccd } = req.body;
    // Tạo mã khách thuê tự động (ví dụ: KT + số random)
    const makt = 'KT' + Math.floor(Math.random() * 1000000);

    // Tạo khách thuê mới
      const newUser = await Khachthue.create({
      ten,
      email,
      pass: matKhau,
      makt,
      sdt,
      cccd
    });
    req.session.user = {
      ten: newUser.ten,
      email: newUser.email,
      makt: newUser.makt,
      role: newUser.role
    };



    // Sau khi đăng ký thành công, chuyển hướng về trang đăng nhập
    res.redirect('/login');
  } catch (error) {
    res.render('register', { error: 'Đăng ký thất bại. Vui lòng thử lại!' });
  }
});
module.exports = router;