
// En este archivo estan las rutas basicas (URLs)

const {Router} = require('express');
const router = Router();
const {renderIndex,renderAbout} = require('../controllers/index.controller');

//views/partial/navigation.hbs para redireccionar la URL...
router.get('/', renderIndex);
router.get('/about', renderAbout);

module.exports = router;