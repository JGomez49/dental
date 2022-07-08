//method-override: https://www.youtube.com/watch?v=dFb1r4rUYMQ
// 14. Mensajes con connect-flash: https://www.youtube.com/watch?v=YR5AmzlO-Ww
// 15. Vistas de Login y Registro de Usuarios: https://www.youtube.com/watch?v=l4K12TBbwKg
// 16. Registro de Usuario o SignUp: https://www.youtube.com/watch?v=EpomajNVcMk
// 17. Login de Usuarios con Passport y bcrypt: https://www.youtube.com/watch?v=NN-Jt6EjFAc

const express = require('express');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');

const multer = require('multer');
const uuid = require('uuid');
const { request } = require('http');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override');
const flash = require('connect-flash');

//const session = require('express-session');
// require('cookie-session');

const session = require('cookie-session');
const passport = require('passport');

// ---------------------Initializations:
const app = express();
require('./config/passport');

// ---------------------Settings:
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// ---------------------Middlewares:
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const storage = multer.diskStorage({
    destination: path.join(__dirname , 'public/img/uploads'),
    filename: (req, file, cb, filename) =>{
        cb(null, file.originalname);
    }
});
app.use(multer({storage: storage}).single('image'));

// ---------------------Global Variables:
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// ---------------------Routes:
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/notespet.routes'));

// ---------------------Static Files:
app.set(express.static(path.join(__dirname, 'public')));

module.exports = app;
