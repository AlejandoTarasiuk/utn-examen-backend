const pool = require('../config/db');

async function createUser({nombre, apellido, email, contraseña, dni, telefono, role='user'}) {
  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, apellido, email, contraseña, dni, telefono, role) VALUES (?,?,?,?,?,?,?)`,
    [nombre, apellido, email, contraseña, dni, telefono, role]
  );
  return result.insertId;
}

async function findByEmail(email) {
  const [rows] = await pool.query(`SELECT * FROM usuarios WHERE email = ? LIMIT 1`, [email]);
  return rows[0];
}

async function getUsuariosWithPedidos() {
  const [rows] = await pool.query(`
    SELECT u.id, u.nombre, u.apellido, u.email, COALESCE(COUNT(p.id),0) AS total_pedidos
    FROM usuarios u
    LEFT JOIN pedidos p ON u.id = p.id_usuario
    GROUP BY u.id
  `);
  return rows;
}

module.exports = { createUser, findByEmail, getUsuariosWithPedidos };
