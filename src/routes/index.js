const newsRouter = require('./news');
const siteRouter = require('./site');
const khachthueRouter = require('./khachthue');
const authRouter = require('./auth');
const Khachthue = require('../app/models/Khachthue');
const Chutro = require('../app/models/Chutro');
const hopdongRouter = require('./hopdong');


function route(app) {
  app.use('/hopdong', hopdongRouter);
  app.use('/khachthue', khachthueRouter);
  app.use('/news', newsRouter);
  app.use('/', siteRouter);
  app.use('/', authRouter);
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });


  // app.get('/news', (req, res) => {
  //   res.render('news');
  // })




  app.get('/login', (req, res) => {
    res.render('login');
  })
  app.post('/login', async (req, res) => {
    const { email, matKhau } = req.body;
     // Kiểm tra khách thuê
  let user = await Khachthue.findOne({ email, pass: matKhau });
  if (user) {
    req.session.user = {
      ten: user.ten,
      email: user.email,
      makt: user.makt,
      role: 'user'
    };
    return res.redirect('/');
  }
  // Kiểm tra chủ trọ
  let admin = await Chutro.findOne({ email, pass: matKhau });
  if (admin) {
    req.session.user = {
      ten: admin.ten,
      email: admin.email,
      idchutro: admin.idchutro,
      role: 'admin'
    };
    return res.redirect('/');
  }
  // Không đúng
  res.render('login', { error: 'Email hoặc mật khẩu không đúng!' });
});

}

module.exports = route;