const productosModel = require('../models/productosModels.js');

async function getProductos(req, res, next) {
  try {
    const rows = await productosModel.getAllProductos();
    res.json(rows);
  } catch (err) { next(err); }
}

async function createProducto(req, res, next) {
  try {
    const id = await productosModel.createProducto(req.body);
    res.status(201).json({ id });
  } catch (err) { next(err); }
}

async function updateProducto(req, res, next) {
  try {
    await productosModel.updateProducto(req.params.id, req.body);
    res.json({ ok: true });
  } catch (err) { next(err); }
}

async function deleteProducto(req, res, next) {
  try {
    await productosModel.deleteProducto(req.params.id);
    res.json({ ok: true });
  } catch (err) { next(err); }
}

module.exports = { getProductos, createProducto, updateProducto, deleteProducto };
