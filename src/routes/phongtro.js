const express = require('express');
const router = express.Router();
const phongTroController = require('../app/controllers/PhongTroController');

router.get('/', phongTroController.index);

module.exports = router;