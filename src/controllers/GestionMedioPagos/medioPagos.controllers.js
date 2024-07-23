import { pool } from "../../db.js";

export const getFormaPago = async (req, res) => {
  try {
    const formaPago = await pool.query("SELECT * FROM formadepago");
    res.send(formaPago[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const createFormaPago = async (req, res) => {
  try {
    const { medioDePago, tipoFactura } = req.body;
    const [result] = await pool.query(
      "INSERT INTO formadepago (medioDePago, tipoFactura) VALUES (?,?)",
      [medioDePago, tipoFactura]
    );
    const newFormaPago = {
      idformaDePago: result.insertId,
      medioDePago,
      tipoFactura,
    };
    res.status(201).json(newFormaPago);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};


export const updateFormaPago = async (req, res) => {
    try {
      const { id } = req.params;
      const { medioDePago, tipoFactura } = req.body;
      const query = `
      UPDATE formadepago SET medioDePago = ?, tipoFactura = ? WHERE idformaDePago = ?
      `
      const value = [medioDePago,tipoFactura,id]
      const [rows] = await pool.query(query,value);

      if(rows.affectedRows === 0){
        res.status(404).json({message:"No se encontro el medio de pago a actualizar"})
      }

      const [rowsSelect] = await pool.query(
        "SELECT * FROM formadepago WHERE idformaDePago = ?",
        [id]
      );
      res.json(rowsSelect[0]);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
      console.log({ error: error.message });
    }
  };
  

  export const deleteFormaPago = async (req, res) => {
    try {
      const { id } = req.params;
      const query = "DELETE FROM formadepago WHERE idformaDePago = ?";
      const [rows] = await pool.query(query, [id]);
      if (rows.affectedRows === 0) {
        res.status(404).json({ error: "No se encontro el formadepago a eliminar" });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
      console.log({ error: error.message });
    }
  };
  


