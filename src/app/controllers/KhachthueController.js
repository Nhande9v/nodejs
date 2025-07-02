const Khachthue = require('../models/Khachthue');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose'); 

class KhachthueController {
  async index(req, res) {
    try {
      const khachthue = await Khachthue.find({});
      res.render('khachthue', {
        khachthue: multipleMongooseToObject(khachthue),
        isAdmin: req.session.user && req.session.user.role === 'admin'
      });
    } catch (err) {
      res.status(400).json({ error: 'ERROR!!!' });
    }
  }
  async edit(req, res) {
    const khach = await Khachthue.findById(req.params.id);
    res.render('edit-khachthue', { khach: mongooseToObject(khach) });
  }

  async update(req, res) {
    await Khachthue.updateOne({ _id: req.params.id }, req.body);
    res.redirect('/khachthue');
  }

  async delete(req, res) {
    await Khachthue.deleteOne({ _id: req.params.id });
    res.redirect('/khachthue');
  }
}

module.exports = new KhachthueController();