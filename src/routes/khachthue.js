const express = require('express');
const router = express.Router();

const khachthueController = require('../app/controllers/KhachthueController');
const isAdmin = require('../middleware/isAdmin');
router.get('/', khachthueController.index);

// Chỉ admin mới được sửa/xóa
router.get('/:id/edit', isAdmin, khachthueController.edit);
router.post('/:id/edit', isAdmin, khachthueController.update);
router.post('/:id/delete', isAdmin, khachthueController.delete);

module.exports = router;