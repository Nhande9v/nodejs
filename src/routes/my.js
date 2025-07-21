const express = require('express');
const router = express.Router();
const myController = require('../app/controllers/MyController');
const isUser = (req, res, next) => req.session.user && req.session.user.role === 'user' ? next() : res.status(403).send('Bạn không có quyền!');

router.get('/hoadon', isUser, myController.myhoadon);
router.get('/hopdong', myController.myhopdong);

module.exports = router;