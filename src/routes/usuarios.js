const express = require('express');
const router = express.Router();
const { registerUser, loginUser, reporteUsuarios } = require('../controllers/usuariosController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

router.post('/register', verifyToken, checkRole(['superAdmin']), registerUser);
router.post('/login', loginUser);
router.get('/report', verifyToken, checkRole(['superAdmin']), reporteUsuarios);

module.exports = router;
