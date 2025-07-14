

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const path = require('path')
const session = require('express-session');


const route = require('./routes/index');

const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined'))

//middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine('hbs', engine({
  extname: '.hbs',
}));

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    formatDate(date) {
      if (!date) return '';
      return new Date(date).toLocaleDateString('vi-VN');
    },
    sum: (a, b) => a + b,
    eq: (a, b) => a === b,
    lookup: (obj, field) => obj && obj[field],
    formatCurrency: (value) => value ? value.toLocaleString('vi-VN') : 0
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
app.use(session({
  secret: 'phongtro_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isUser = req.session.user && req.session.user.role === 'user';
  next();
});


route(app);


app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
