const express = require('express');
const router = express.Router();
const { createPedido, listPedidos } = require('../controllers/pedidosController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

router.post('/', verifyToken, checkRole(['user']), createPedido);
router.get('/', verifyToken, checkRole(['admin','superAdmin']), listPedidos);

module.exports = router;
