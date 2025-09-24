CREATE DATABASE IF NOT EXISTS UTNExamen;
USE UTNExamen;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100),
  password VARCHAR(255) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  dni VARCHAR(50),
  telefono VARCHAR(50),
  role ENUM('superAdmin','admin','user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_articulo VARCHAR(100),
  nombre VARCHAR(255) NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  numero_pedido VARCHAR(100) UNIQUE,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pedidos_productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_pedidos INT NOT NULL,
  id_productos INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  cantidad INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_pedidos) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_productos) REFERENCES productos(id) ON DELETE RESTRICT
);

INSERT INTO usuarios (nombre, apellido, email, password, role)
VALUES (
  'Super',
  'Admin',
  'super@utn.local',
  '$2b$10$ZbVNZ5w8O.dGUhXZVwM6iOy6B8RjaIpcD0GlcUoAMsm.CcnIptE2m',
  'superAdmin'
);
