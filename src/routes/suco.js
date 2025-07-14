const express = require('express');
const router = express.Router();
const SucoController = require('../app/controllers/SucoController');
const isAdmin = require('../middleware/isAdmin');

router.get('/:idphong', SucoController.showForm);
router.post('/:idphong', SucoController.submit);

router.get('/', isAdmin, SucoController.listForChutro);
router.post('/:idsuco/mark-done', isAdmin, SucoController.markAsResolved);
module.exports = router;