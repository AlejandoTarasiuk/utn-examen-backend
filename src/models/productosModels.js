const pool = require('../config/db.js');

async function createProducto({codigo_articulo, nombre, precio_unitario}) {
  const [result] = await pool.query(`INSERT INTO productos (codigo_articulo, nombre, precio_unitario) VALUES (?,?,?)`,
    [codigo_articulo, nombre, precio_unitario]);
  return result.insertId;
}

async function getAllProductos() {
  const [rows] = await pool.query('SELECT * FROM productos');
  return rows;
}

async function getProductoById(id) {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0];
}

async function updateProducto(id, data) {
  const { codigo_articulo, nombre, precio_unitario } = data;
  await pool.query('UPDATE productos SET codigo_articulo = ?, nombre = ?, precio_unitario = ? WHERE id = ?',
    [codigo_articulo, nombre, precio_unitario, id]);
}

async function deleteProducto(id) {
  await pool.query('DELETE FROM productos WHERE id = ?', [id]);
}

module.exports = { createProducto, getAllProductos, getProductoById, updateProducto, deleteProducto };
