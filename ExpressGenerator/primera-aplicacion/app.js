//const puerto = process.env.PUERTO || 3000;
//console.log('Puerto parametros: ' + puerto);
require('./config/config.js');
//console.log(process.env.MiVariable);
//console.log({...process.env.MYSQL});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
const i18n = require('i18n');
const winston = require('./config/winston');

let hbs = require('hbs');
let paginate = require('express-paginate');
require('./helpers/hbs')(hbs);
let hbsUtils = require('hbs-utils')(hbs);
hbsUtils.registerPartials(`${__dirname}/views/partials`);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);
//hbs.registerPartials(`${__dirname}/views/partials`);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
i18n.configure({//se le pasa un objeto
  locales: ['es', 'en'],
  cookie: 'secret-lang',
  directory: __dirname+'/locales',
  defaultlocale: 'es'
})
app.use(i18n.init);
var admins = require('./routes/admins');
app.use(logger('combined', {stream: winston.stream}));
winston.silly('Mensaje de informacion');
app.use(session({
  secret: 'clavesecreta',
  name: 'super-secret-cookie-name',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());//para que registre la funcionalidad de session flash antes de crearla
app.use('/admins', admins);
var login_flash = require('./routes/login_flash');
app.use('/login_flash', login_flash);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//paginacion
app.use(paginate.middleware(5,100));//es una funcion que se llama middleware dentro de paginate

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/miprueba', require('./routes/pruebas'));
app.use('/components', express.static(`${__dirname}/public/components`));
app.use('/mailer', require('./routes/mailer'));
app.use('/multer', require('./routes/multer'));

app.use('/i18n',require('./routes/i18n'));


app.get('locale/:lang',(req,res)=>{
  res.cookie(
    'secret-lang',
    req.params.lang
  );
  res.redirect('/');
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
