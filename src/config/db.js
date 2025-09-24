const mysql = require('mysql2/promise');
require('dotenv').config();

const pool =mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'utn',
    password: process.env.DB_PASS || 'utnpass',
    database: process.env.DB_NAME || 'EXAMENUTN',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) :3309,
    waitForConnections: true,
    conectionLimit:10
});

module.exports =pool;