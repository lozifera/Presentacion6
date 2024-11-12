const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');

//POST /api/usuario/login
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);


module.exports = router;