const Phongtro = require('../models/Phongtro');
const { multipleMongooseToObject} = require('../../util/mongoose')

class SiteController {

   

 async index(req, res){      
  try {
    const phongtro = await Phongtro.find({});
    const Hopdong = require('../models/Hopdong');
    // Lấy hợp đồng của từng phòng
    const hopdongs = await Hopdong.find({});
    // Tạo map idphong -> hopdong
    const hopdongMap = {};
    hopdongs.forEach(hd => { hopdongMap[hd.idphong] = hd; });
    res.render('home', {
  phongtro : multipleMongooseToObject(phongtro),
  hopdongMap,
  isAdmin: req.session.user && req.session.user.role === 'admin',
  isUser: req.session.user && req.session.user.role === 'user'
});
  } catch (err) {
    res.status(400).json({ error: 'ERROR!!!' });
  }
}
  
  

  //[GET] /search
  search(req, res){
    res.render('search');
  }

}

module.exports = new SiteController;


