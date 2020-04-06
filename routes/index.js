let express = require('express');
let router = express.Router();

let homeController = require('../controllers/homeController');
let adminController = require('../controllers/adminController');
let usuariosController = require('../controllers/usuariosController');
let loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', homeController.index);

router.post('/contato', homeController.contato);

router.get('/newsletter', homeController.newsletter);

router.get('/admin', adminController.index);

router.get('/cadastroUsuario', usuariosController.index);

router.post('/cadastroUsuario', usuariosController.cadastro);

router.get('/login', loginController.index);

router.post('/login', loginController.login);

router.get('/logout', loginController.logout);

module.exports = router;
