const pool = require('../config/db.js');
const pedidosModel = require('../models/pedidosModels.js');
const pedidosProductosModel = require('../models/pedidosProductosModels.js');
const productosModel = require('../models/productosModels.js');

async function createPedido(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const userId = req.user.id;
    const { numero_pedido, productos } = req.body;
    const pedidoId = await pedidosModel.createPedido(userId, numero_pedido, 0);

    let pedidoTotal = 0;
    for (const item of productos) {
      const prod = await productosModel.getProductoById(item.id_productos);
      if (!prod) throw new Error('Producto no encontrado: ' + item.id_productos);
      const precio_unitario = prod.precio_unitario;
      const total = Number((precio_unitario * item.cantidad).toFixed(2));
      await pedidosProductosModel.addProductoToPedido(pedidoId, item.id_productos, precio_unitario, item.cantidad, total);
      pedidoTotal += total;
    }
    await pedidosModel.updatePedidoTotal(pedidoId, pedidoTotal);
    await conn.commit();
    res.status(201).json({ id: pedidoId, total: pedidoTotal });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

async function listPedidos(req, res, next) {
  try {
    const pedidos = await pedidosModel.listPedidosDetailed();
    const result = [];
    for (const p of pedidos) {
      const items = await pedidosProductosModel.getItemsByPedido(p.pedido_id);
      result.push({ ...p, items });
    }
    res.json(result);
  } catch (err) { next(err); }
}

module.exports = { createPedido, listPedidos };
