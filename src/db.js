import { createPool } from "mysql2/promise";


export const pool = createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "3129",
    database: "ecommercedbpruebav2",
});


pool.getConnection((error,conection)=>{
    if(error) throw (error);
    console.log('Conectada correctamente',conection)
});


