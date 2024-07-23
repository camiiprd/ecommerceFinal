import { pool } from "../../db.js";

export const getCategoria = async (req, res) => {
  try {
    const categoria = await pool.query("SELECT * FROM Categoria");
    res.send(categoria[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

//nombreCat, subCat

export const createCategoria = async (req, res) => {
  try {
    const { nombreCat, subCat } = req.body;
    const query = "INSERT INTO Categoria (nombreCat, subCat) VALUES (?,?)";
    const values = [nombreCat, subCat];
    const [result] = await pool.query(query, values);
    const newCategoria = {
      idcategoria: result.insertId,
      nombreCat,
      subCat,
    };
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreCat, subCat } = req.body;
    const query =
      "UPDATE Categoria SET nombreCat = ?, subCat = ? WHERE idcategoria = ?";
    //nombreCat, subCat
    const values = [nombreCat, subCat, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el cliente a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM Categoria WHERE idcategoria = ?",
      [id]
    );
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM categoria WHERE idcategoria = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro el Categoria a eliminar" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
