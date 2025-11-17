const express = require('express');
const router = express.Router();
const HoadonController = require('../app/controllers/HoadonController');
const isAdmin = require('../middleware/isAdmin');

router.post('/:idphong/confirm', HoadonController.confirmPayment);
router.get('/:idphong/tao', isAdmin, HoadonController.showForm);
router.post('/:idphong/tao', isAdmin, HoadonController.create);
router.get('/:idphong', HoadonController.detail);

module.exports = router;