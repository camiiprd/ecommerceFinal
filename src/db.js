import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar las variables de entorno del archivo .env
dotenv.config();

export const pool = createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.getConnection((error, connection) => {
    if (error) throw error;
    console.log('Conectada correctamente', connection);
});
