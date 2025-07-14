const express = require('express');
const router = express.Router();

const khachthueController = require('../app/controllers/KhachthueController');
const isAdmin = require('../middleware/isAdmin');
router.get('/', khachthueController.index);

// Chỉ admin mới được sửa/xóa
router.get('/:makt/edit', isAdmin, khachthueController.edit);
router.post('/:makt/edit', isAdmin, khachthueController.update);
router.post('/:makt/delete', isAdmin, khachthueController.delete);

module.exports = router;