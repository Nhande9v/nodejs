const express = require('express');
const router = express.Router();
const DienNuocController = require('../app/controllers/DienNuocController');
const isAdmin = require('../middleware/isAdmin');

router.post('/', isAdmin, DienNuocController.create);
router.get('/',isAdmin, DienNuocController.index);
router.get('/:idphong', DienNuocController.showForm);
router.get('/:idphong/:thang', DienNuocController.chitiet);
module.exports = router;
