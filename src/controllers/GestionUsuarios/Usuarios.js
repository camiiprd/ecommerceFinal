import { pool } from "../../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config.js";
import { createAccesToken } from "../../libs/createAccessToken.js";

export const registroGeneral = (rol) => {
  return async (req, res) => {
    try {
      const { nombre, apellido, email, DNI, telefono, username, password } =
        req.body;

      const hasheadPassword = await bcryptjs.hash(password, 10);
      // Validas si el usuario existe
      const [rows] = await pool.query(
        "SELECT * FROM Usuarios WHERE username = ?",
        [username]
      );
      if (rows.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // Creamos el registro
      const [result] = await pool.query(
        "INSERT INTO Usuarios (rol, nombre, apellido, email, DNI, telefono,username,  password) VALUES (?,?,?,?,?,?,?,?)",
        [rol, nombre, apellido, email, DNI, telefono, username, hasheadPassword]
      );

      // Si falla detenemos el programa
      if (result.error) {
        throw result.error;
      }

      console.log(result.insertId, "Id del usuario creado, RegistroGeneral");
      const datosUsuarios = {
        idusuarios: result.insertId,
        username,
        rol,
      };
      const token = createAccesToken(datosUsuarios);
      res.cookie("token", token);
      console.log(token);
      res.status(201).json(datosUsuarios);
    } catch (error) {
      res.status(500).json({ error: "error en el servidor" });
      console.log({ error: error.message });
      console.log("Error de la funcion Register");
    }
  };
};

export const loginUsuariosClientes = async (req, res) => {
  const { username, password } = req.body;
  const fecha = new Date().toISOString().slice(0, 10);
  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [username]
    );
    console.log(rows[0], "Rows[0]");
    const rol = rows[0].rol;
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectas" });
    }

    const storePassword = rows[0].password;
    const validPassword = await bcryptjs.compare(password, storePassword);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectas" });
    }

    const datosUsuarios = {
      idusuarios: rows[0].idusuarios,
      username,
      rol,
    };

    const token = createAccesToken(datosUsuarios);
    console.log(token, "token de login");

    await pool.query(
      "INSERT INTO Login (token,fecha,idusuarios) VALUES (?,?,?)",
      [token, fecha, rows[0].idusuarios]
    );

    res.cookie("token", token);
    res.status(201).json(datosUsuarios);
    //Creamos la conexion
  } catch (error) {
    res
      .status(500)
      .json({ error: "error en el servidor", details: error.message });
    console.log({ error: error.message });
    console.log("Error de la funcion login");
  }
};

export const logoutClientes = async (req, res) => {
  try {
    res.cookie("token", "", {
      expire: new Date(0),
    });
    return res.status(200).json({ message: "Se cerro la sesion" });
  } catch (error) {
    console.log({ error: error.message });
    console.log("Error de la funcion logout");
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await pool.query("SELECT * FROM Usuarios");
    res.send(usuarios[0]);
  } catch (error) {
    console.log({ error: error.message });
    console.log("Error de la funcion getUsuarios");
  }
};

export const getIdUsuarios = async (req,res)=>{
  try {
      const { id } = req.params;
      const query= `
       SELECT * FROM usuarios WHERE idusuarios = ?
      `
      const [ rows ] = await pool.query(query,[id])
      if(rows.length <= 0){
        return res.status(404).json({message:"No existe el usuario"})
      }
     res.json(rows[0]);      
  } catch (error) {
    console.log({ error: error.message });
    console.log("Error de la funcion getUsuarios");
  }
}

export const updateUsuarios = async (req, res) => {
  try {
    const { rol, nombre, apellido, email, DNI, telefono, username, password } = req.body;
    const UpdateHasheadPassword = await bcryptjs.hash(password, 10);
    const { id } = req.params;
    const query = `
     UPDATE usuarios SET rol = ?, nombre = ?, apellido = ?, email = ?, DNI = ?, telefono = ?,
     username = ?, password = ? WHERE idusuarios = ?
    `
    const values = [rol, nombre, apellido, email, DNI, telefono, username, UpdateHasheadPassword,id];
    const [ rows ] = await pool.query(query,values);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el usuario a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM usuarios WHERE idusuarios = ?",
      [id]
    );

    res.json(rowsSelect[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "error en el servidor", details: error.message });
    console.log({ error: error.message });
    console.log("Error de la funcion getUsuarios");
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.status(401).json({ message: "No autorizado" });
      const userFound = await pool.query(
        "SELECT * FROM Usuarios WHERE username = ?",
        [user.username]
      );
      console.log(user, "user decodificado, verifyToken controllers usuarios");
      if (!userFound) return res.status(401).json({ message: "No autorizado" });
      return res.json({
        idusuarios: user.idusuarios,
        username: user.username,
        rol: user.rol,
      });
    });
  } catch (error) {
    console.log(error);
    console.log("Error en la funcion VerifyToken");
  }
};
