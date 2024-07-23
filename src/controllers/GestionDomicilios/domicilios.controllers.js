import { pool } from "../../db.js";

export const getDomicilios = async (req, res) => {
  try {
    const entrega = await pool.query("SELECT * FROM domicilios");
    res.send(entrega[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};


export const getIdDomicilios = async (req,res)=>{
  try {
      const { id } = req.params;
      const query = "SELECT * FROM domicilios WHERE idusuarios = ?"
      const [ rows ] = await pool.query(query,[id])
      if(rows.length <= 0){
        // return res.status(404).json({message:"No existe el domicilio"})
        return res.json([]), console.log("No hay domicilios")
      }
      res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
}



export const createDomicilios = async (req, res) => {
  try {
    const { codigoPostal, calle, numero, descripcion, idusuarios } = req.body;
    const query =
      "INSERT INTO domicilios (codigoPostal, calle, numero, descripcion, idusuarios) VALUES (?,?,?,?,?)";
    const values = [codigoPostal, calle, numero, descripcion,idusuarios];
    const [result] = await pool.query(query, values);
    const newEntrega = {
      identrega: result.insertId,
      codigoPostal,
      calle,
      numero,
      descripcion,
    };
    res.status(201).json(newEntrega);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const updateDomicilios = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigoPostal, calle, numero, descripcion } = req.body;
    const query =
      "UPDATE domicilios SET codigoPostal = ?, calle = ?, numero = ?, descripcion = ? WHERE idDomicilio = ?";
    //codigoPostal, calle, numero, descripcion
    const values = [codigoPostal, calle, numero, descripcion, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el cliente a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM entrega WHERE idDomicilio = ?",
      [id]
    );
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
