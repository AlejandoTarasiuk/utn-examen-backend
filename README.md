Examen Backend UTN - Node.js + Express + Docker + MySQL

Este proyecto implementa un backend completo con Node.js, Express, MySQL y Docker Compose.  
El sistema gestiona usuarios, productos y pedidos, con autenticación JWT, contraseñas hasheadas con bcrypt y manejo de roles (`superAdmin`, `admin`, `user`).

Tecnologías
- Node.js + Express
- MySQL 8
- Docker Compose
- JWT (jsonwebtoken)
- Bcrypt
- Adminer (cliente web para DB)

Estructura del proyecto
/src
├─ config/
│ └─ db.js 
├─ controllers/
│ ├─ usuariosController.js
│ ├─ productosController.js
│ └─ pedidosController.js
├─ middlewares/
│ ├─ authMiddleware.js
│ ├─ roleMiddleware.js
│ └─ errorHandler.js
├─ models/
│ ├─ usuariosModel.js
│ ├─ productosModel.js
│ ├─ pedidosModel.js
│ └─ pedidosProductosModel.js
├─ routes/
│ ├─ usuarios.js
│ ├─ productos.js
│ ├─ pedidos.js
│ └─ index.js
└─ index.js
docker-compose.yml
mysql-init/init.sql


Estructura de las tablas

usuarios
- `id` (PK)
- `nombre`
- `apellido`
- `password` (bcrypt hash)
- `email` (UNIQUE)
- `dni`
- `telefono`
- `role` (ENUM: `superAdmin`, `admin`, `user`)
- `created_at`

productos
- `id` (PK)
- `codigo_articulo`
- `nombre`
- `precio_unitario`
- `created_at`

pedidos
- `id` (PK)
- `id_usuario` (FK → usuarios.id)
- `numero_pedido`
- `fecha`
- `total`

pedidos_productos
- `id` (PK)
- `id_pedidos` (FK → pedidos.id)
- `id_productos` (FK → productos.id)
- `precio_unitario` (precio histórico)
- `cantidad`
- `total`


Models

usuariosModel.js
- `createUser(data)` → crea un usuario con rol.  
- `findByEmail(email)` → busca usuario por email.  
- `getUsuariosWithPedidos()` → devuelve usuarios + cantidad de pedidos.  

productosModel.js
- `createProducto(data)` → crea producto.  
- `getAllProductos()` → lista productos.  
- `updateProducto(id, data)` → edita.  
- `deleteProducto(id)` → elimina.  

pedidosModel.js
- `createPedido(userId, numero, total)` → crea pedido.  
- `updatePedidoTotal(id, total)` → actualiza total.  
- `listPedidosDetailed()` → lista pedidos con JOIN a usuarios.  

pedidosProductosModel.js
- `addProductoToPedido(pedidoId, productoId, precio, cantidad, total)`  
- `getItemsByPedido(pedidoId)`  

Controllers

usuariosController.js
- `registerUser` → crea usuario (solo superAdmin).  
- `loginUser` → login con bcrypt + JWT.  
- `reporteUsuarios` → usuarios con cantidad de pedidos.  

productosController.js
- CRUD de productos (restricciones por rol).  

pedidosController.js
- `createPedido` → crea un pedido con productos.  
- `listPedidos` → lista pedidos con detalle de items.  

Middlewares
- `authMiddleware.js` → valida JWT (`verifyToken`).  
- `roleMiddleware.js` → restringe endpoints por rol (`checkRole`).  
- `errorHandler.js` → manejo centralizado de errores.  

/usuarios
- `POST /login` → login.  
- `POST /register` → crear usuario (solo superAdmin).  
- `GET /report` → usuarios con cantidad de pedidos (solo superAdmin).  

/productos
- `GET /` → listar productos (público).  
- `POST /` → crear producto (admin y superAdmin).  
- `PUT /:id` → actualizar producto (admin y superAdmin).  
- `DELETE /:id` → eliminar producto (solo superAdmin).  

/pedidos
- `POST /` → crear pedido (user).  
- `GET /` → listar pedidos con detalle (admin y superAdmin).  



Roles
superAdmin
  - Crear y eliminar usuarios.  
  - Puede hacer todo lo de admin y user.  
admin
  - Gestionar productos (crear, actualizar, eliminar).  
  - Ver pedidos.  

user
  - Crear pedidos con productos.  
  - No puede crear usuarios ni productos.  

URL: http://localhost:8080
Host: 127.0.0.1
puerto: 3309
user: utn
pass: utnpass
DB: UTNExamen

El primer superAdmin ya está creado en init.sql 
(usuario: super@utn.local, pass: SuperPass123!).
El puerto de la API es 3000.
El puerto de MySQL es 3309.
