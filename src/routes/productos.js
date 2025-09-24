const express = require('express');
const router = express.Router();
const { getProductos, createProducto, updateProducto, deleteProducto } = require('../controllers/productosController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { checkRole } = require('../middlewares/roleMiddleware');

router.get('/', getProductos);
router.post('/', verifyToken, checkRole(['admin','superAdmin']), createProducto);
router.put('/:id', verifyToken, checkRole(['admin','superAdmin']), updateProducto);
router.delete('/:id', verifyToken, checkRole(['superAdmin']), deleteProducto);

module.exports = router;
