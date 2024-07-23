import { pool } from "../../db.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await pool.query("SELECT * FROM Productos");
    res.send(productos[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const createProductos = async (req, res) => {
  try {
    const { codeBar, nombre, descripcion, precio, stock, img, idproveedores, idcategoria } = req.body;
    const query =
      "INSERT INTO productos (CodeBar, Nombre, Descripcion, Precio, stock, img, idproveedores, idcategoria ) VALUES (?,?,?,?,?,?,?,?)";
    const values = [codeBar, nombre, descripcion, precio, stock, img, idproveedores, idcategoria];
    const [result] = await pool.query(query, values);
    const newProducto = {
      idProductos: result.insertId,
      codeBar,
      nombre,
      descripcion,
      precio,
      stock,
      img,
      idproveedores,
      idcategoria
    };
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const getIdProductos = async (req,res)=>{
  try {
    const { id } = req.params;
    const query = "SELECT * FROM Productos WHERE idproductos = ?";
    const [ rows ] = await pool.query(query,[id]);

    if(rows.length <= 0){
      return res.status(404).json({message:"No existe el producto"})
    }

    res.json(rows[0])
    
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
}

export const updateProductos = async (req, res) => {
    try {
      const { codeBar, nombre, descripcion, precio, stock, img, idproveedores, idcategoria } = req.body;
      console.log(req.body,'Data Frontend');
      const { id } = req.params;
      const query =
        "UPDATE productos SET codeBar = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, img = ?, idproveedores = ?, idcategoria = ?  WHERE idproductos = ?";
        //codeBar, nombre, descripcion, precio, stock, familia, idproveedores, idcategoria
      const values = [codeBar, nombre, descripcion, precio, stock, img, idproveedores, idcategoria, id];
      const [rows] = await pool.query(query, values);
  
      if (rows.affectedRows === 0) {
        res.status(404).json({ error: "No se contro el cliente a actualizar" });
      }
  
      const [rowsSelect] = await pool.query(
        "SELECT * FROM Productos WHERE idProductos = ?",
        [id]
      );
      res.json(rowsSelect[0]);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
      console.log({ error: error.message });
    }
  };
  
  export const deleteProductos = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "DELETE FROM Productos WHERE idproductos = ?";
      const [rows] = await pool.query(query, [id]);
      if (rows.affectedRows === 0) {
        res.status(404).json({ error: "No se encontro el Productos a eliminar" });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
      console.log({ error: error.message });
    }
  };