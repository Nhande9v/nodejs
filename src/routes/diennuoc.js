const express = require('express');
const router = express.Router();
const DienNuocController = require('../app/controllers/DienNuocController');
const isAdmin = require('../middleware/isAdmin');

// Nhập điện
router.get('/dien/:idphong', isAdmin, DienNuocController.showDienForm);
router.post('/dien/:idphong', isAdmin, DienNuocController.submitDien);

// Nhập nước
router.get('/nuoc/:idphong', isAdmin, DienNuocController.showNuocForm);
router.post('/nuoc/:idphong', isAdmin, DienNuocController.submitNuoc);

module.exports = router;