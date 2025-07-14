const express = require('express');
const router = express.Router();
const myController = require('../app/controllers/MyController');
const isAdmin = require('../middleware/isAdmin');

router.get('/hopdong', myController.myhopdong);

module.exports = router;