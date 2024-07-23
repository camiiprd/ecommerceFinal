import { pool } from "../../db.js";

export const getProvedores = async (req, res) => {
  try {
    const proveedores = await pool.query("SELECT * FROM Proveedores");
    res.send(proveedores[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const createProveedores = async (req, res) => {
  try {
    const { razonSocial, CUIT, mail, direccion, telefono } = req.body;
    const query =
      "INSERT INTO Proveedores (razonSocial, CUIT, mail, direccion, telefono) VALUES (?,?,?,?,?)";
    const values = [razonSocial, CUIT, mail, direccion, telefono];
    const [result] = await pool.query(query, values);
    const newProveedor = {
      idProveedores: result.insertId,
      razonSocial,
      CUIT,
      mail,
      direccion,
      telefono,
    };
    res.status(201).json(newProveedor);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const updateProveedores = async (req, res) => {
  try {
    const { id } = req.params;
    const { razonSocial, CUIT, mail, direccion, telefono } = req.body;
    const query =
      "UPDATE proveedores SET razonSocial = ?, CUIT = ?, mail = ?, direccion = ?, telefono = ? WHERE idproveedores = ?";
    const values = [razonSocial, CUIT, mail, direccion, telefono, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el cliente a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM Proveedores WHERE idproveedores = ?",
      [id]
    );
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const deleteProveedores = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM Proveedores WHERE idproveedores = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro el Proveedor a eliminar" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
