const express = require('express');
const router = express.Router();
const phongTroController = require('../app/controllers/PhongTroController');
const isAdmin = require('../middleware/isAdmin');

// Hiển thị danh sách phòng trọ
router.get('/', phongTroController.index);

// Sửa phòng (chỉ admin)
router.get('/:idphong/edit', isAdmin, phongTroController.editRoom);
router.post('/:idphong/update', isAdmin, phongTroController.updateRoom);
// Xóa phòng (chỉ admin)
router.post('/:idphong/delete', isAdmin, phongTroController.deleteRoom);

// Thêm phòng (chỉ admin)
router.get('/them', isAdmin, phongTroController.showAddForm);
router.post('/them/store', isAdmin, phongTroController.addRoom);

module.exports = router;