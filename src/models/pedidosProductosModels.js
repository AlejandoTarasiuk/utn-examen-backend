const pool = require('../config/db.js');

async function addProductoToPedido(id_pedidos, id_productos, precio_unitario, cantidad, total) {
  const [result] = await pool.query(
    `INSERT INTO pedidos_productos (id_pedidos, id_productos, precio_unitario, cantidad, total) VALUES (?,?,?,?,?)`,
    [id_pedidos, id_productos, precio_unitario, cantidad, total]
  );
  return result.insertId;
}

async function getItemsByPedido(pedidoId) {
  const [rows] = await pool.query(`
    SELECT pp.*, pr.nombre, pr.codigo_articulo
    FROM pedidos_productos pp
    JOIN productos pr ON pp.id_productos = pr.id
    WHERE pp.id_pedidos = ?
  `, [pedidoId]);
  return rows;
}

module.exports = { addProductoToPedido, getItemsByPedido };
