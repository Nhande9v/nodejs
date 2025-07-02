const express = require('express');
const router = express.Router();
const HopdongController = require('../app/controllers/HopdongController');
const isAdmin = require('../middleware/isAdmin');

// Xem tất cả hợp đồng (chỉ admin)
router.get('/', isAdmin, HopdongController.listAll);
// Xem chi tiết hợp đồng theo _id (chỉ admin)
router.get('/:id', isAdmin, HopdongController.detail);

// Xem hợp đồng của phòng (dùng idphong, cho khách thuê)
router.get('/phong/:phongtroId', HopdongController.viewByRoom);
router.post('/phong/:phongtroId', HopdongController.createForRoom);

module.exports = router;