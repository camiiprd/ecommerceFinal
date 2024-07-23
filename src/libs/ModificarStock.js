import { pool } from '../db.js'

export const modificarStockVenta = async (idProductos, stock)=>{
    try {
        const foundProduct = await pool.query("SELECT stock FROM productos WHERE idproductos = ?",[idProductos]);
        const stockActual = foundProduct[0][0].stock;
        const stockBaja = stock;
        const resultadoFinal = stockActual - stockBaja;

        //Modifico el stock;
        await pool.query("UPDATE productos set stock = ? WHERE idproductos = ?",[resultadoFinal,idProductos])
        console.log("Stock modificado")
        
    } catch (error) {
      console.log(error)
      console.log("Error en libs modificarStock Venta")
    }
}


export const modificarStockEstadoVenta = async(estado,idproductos,stock)=>{
  try {
       if(estado === "anulado"){
          const foundProduct = await pool.query("SELECT stock FROM productos WHERE idproductos = ?",[idproductos]);
          const stockActualProductos = foundProduct[0][0].stock;
          const stockAlta = stock;
          const resultadoFinal = stockActualProductos + Number(stockAlta);
          await pool.query("UPDATE productos SET stock = ? WHERE idproductos = ?",[resultadoFinal,idproductos])
          return {message:"Stock acutalizado correctamente"};
        }
    
  } catch (error) {
    console.log(error);
    console.log("Error en libs modificarStockEstadoVenta")
  }
}