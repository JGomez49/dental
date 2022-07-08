

// 15. Vistas de Login y Registro de Usuarios: https://www.youtube.com/watch?v=l4K12TBbwKg

const {Router} = require('express');
const router = Router();

const { 
    renderSignUpForm, 
    renderSigninForm, 
    signin, 
    signup, 
    logout 
} = require('../controllers/users.controller');

router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);

router.get('/users/signin', renderSigninForm);
router.post('/users/signin', signin);

router.get('/users/logout', logout);


module.exports = router;