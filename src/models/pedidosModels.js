const pool = require('../config/db.js');

async function createPedido(id_usuario, numero_pedido, total = 0) {
  const [result] = await pool.query(`INSERT INTO pedidos (id_usuario, numero_pedido, total) VALUES (?,?,?)`,
    [id_usuario, numero_pedido, total]);
  return result.insertId;
}

async function updatePedidoTotal(pedidoId, total) {
  await pool.query('UPDATE pedidos SET total = ? WHERE id = ?', [total, pedidoId]);
}

async function getPedidoById(id) {
  const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
  return rows[0];
}

async function listPedidosDetailed() {
  const [rows] = await pool.query(`
    SELECT p.id AS pedido_id, p.numero_pedido, p.fecha, p.total, u.id AS usuario_id, u.nombre, u.apellido
    FROM pedidos p
    JOIN usuarios u ON u.id = p.id_usuario
    ORDER BY p.fecha DESC
  `);
  return rows;
}

module.exports = { createPedido, updatePedidoTotal, getPedidoById, listPedidosDetailed };
