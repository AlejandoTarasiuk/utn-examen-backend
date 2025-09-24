const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const usuariosModel = require('../models/usuariosModels.js');

require('dotenv').config();

async function registerUser(req, res, next) {
  try {
    const { nombre, apellido, email, contraseña, dni, telefono, role } = req.body;
    const hashed = await bcrypt.hash(contraseña, 10);
    const assignedRole = (req.user && req.user.role === 'superAdmin' && role) ? role : 'user';
    const id = await usuariosModel.createUser({ nombre, apellido, email, contraseña: hashed, dni, telefono, role: assignedRole });
    res.status(201).json({ id });
  } catch (err) { next(err); }
}

async function loginUser(req, res, next) {
  try {
    const { email, contraseña } = req.body;
    const user = await usuariosModel.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.contraseña);
    if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '8h' });
    res.json({ token });
  } catch (err) { next(err); }
}

async function reporteUsuarios(req, res, next) {
  try {
    const rows = await usuariosModel.getUsuariosWithPedidos();
    res.json(rows);
  } catch (err) { next(err); }
}

module.exports = { registerUser, loginUser, reporteUsuarios };
