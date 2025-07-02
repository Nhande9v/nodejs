const Phongtro = require('../models/Phongtro');
const { multipleMongooseToObject} = require('../../util/mongoose')

class SiteController {

   

  async index(req, res){      
        try {
            const phongtro = await Phongtro.find({});
            // res.json(users); 
            
            res.render('home',{
              phongtro : multipleMongooseToObject(phongtro),
            })
        } catch (err) {
            res.status(400).json({ error: 'ERROR!!!' });
        }
        // res.render('home')
    }
  
  

  //[GET] /search
  search(req, res){
    res.render('search');
  }

}

module.exports = new SiteController;


