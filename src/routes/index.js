const express = require('express');
const router = express.Router();
router.use('/usuarios', require('./usuarios'));
router.use('/productos', require('./productos'));
router.use('/pedidos', require('./pedidos'));
module.exports = router;
