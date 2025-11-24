const express = require('express');
const router = express.Router();
const HopdongController = require('../app/controllers/HopdongController');
const isAdmin = require('../middleware/isAdmin');

// Xem tất cả hợp đồng (chỉ admin)
router.get('/', isAdmin, HopdongController.listAll);
// Xem chi tiết hợp đồng theo _id (chỉ admin)
router.get('/:id', isAdmin, HopdongController.detail);

// Thêm route cho chủ trọ tạo hợp đồng (form nhập tay)
router.get('/tao/:phongtroId', isAdmin, HopdongController.showCreateForm);
router.post('/tao/:phongtroId', isAdmin, HopdongController.createByAdmin);
router.post('/:idhopdong/delete', isAdmin, HopdongController.deleteHopdong);


// Xem hợp đồng của phòng (dùng idphong, cho khách thuê)
router.post('/phong/:phongtroId/yeucau', HopdongController.requestRent);
router.get('/phong/:phongtroId', HopdongController.viewByRoom);
router.post('/phong/:phongtroId', HopdongController.createForRoom);
// Chỉnh sửa hợp đồng của phòng (form và xử lý) - chỉ cho admin
router.get('/phong/:phongtroId/:idhopdong/edit', isAdmin, HopdongController.showEditForm);
router.post('/phong/:phongtroId/:idhopdong/edit', isAdmin, HopdongController.updateForRoom);

module.exports = router;