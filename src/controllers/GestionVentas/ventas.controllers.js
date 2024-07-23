import { pool } from "../../db.js";
import { generarNumeroFactura } from "../../libs/GenerarNumeroFactura.js";

import {
  modificarStockEstadoVenta,
  modificarStockVenta,
} from "../../libs/ModificarStock.js";

export const getVentas = async (req, res) => {
  try {
    const query = `
    SELECT ventas.fecha, ventas.numeroFactura, ventas.estado, ventas.entrega, ventas.total,
    formadepago.mediodepago, usuarios.apellido,usuarios.nombre, usuarios.telefono, ventas.idventas, ventas.idusuarios
    FROM ventas
    JOIN usuarios ON usuarios.idusuarios = ventas.idusuarios
    JOIN formadepago ON formadepago.idformadepago = ventas.idformadepago;
    `;
   
    const ventas = await pool.query(query);
    res.send(ventas[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const getIdVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
    SELECT ventas.fecha, ventas.numeroFactura, ventas.estado, ventas.entrega, ventas.total,
      formadepago.mediodepago, usuarios.apellido,usuarios.nombre, usuarios.telefono, ventas.idventas, ventas.idusuarios,
      domicilios.calle, domicilios.numero,domicilios.descripcion
      FROM ventas
      JOIN usuarios ON usuarios.idusuarios = ventas.idusuarios
      JOIN formadepago ON formadepago.idformadepago = ventas.idformadepago
      JOIN domicilios ON domicilios.idusuarios = usuarios.idusuarios
      WHERE ventas.idventas = ?;
    `;
    const [rows] = await pool.query(query, [id]);

    if (rows.length <= 0) {
      res.status(404).json({ message: "No existe la venta" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const getIdDetalleVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM detalle_venta WHERE idventas = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.length <= 0) {
      res.status(404).json({ message: "No existe la venta" });
    }
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};

export const detalleVentaJoin = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
       SELECT productos.img, productos.nombre,ventas.estado, ventas.entrega, detalle_venta.precioUni, detalle_venta.cantidad, detalle_venta.total,
       formadepago.medioDePago
       FROM detalle_venta
       JOIN productos ON detalle_venta.idproductos = productos.idproductos
       JOIN ventas ON ventas.idventas = detalle_venta.idventas
       JOIN formadepago ON formadepago.idformadepago = ventas.idformadepago
       WHERE detalle_venta.idventas = ?;
      `;

    const [rows] = await pool.query(query, [id]);
    if (rows.length <= 0) {
      res.status(404).json({ message: "No existe la venta" });
    }

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};

export const createVentas = async (req, res) => {
  try {
    const ventas = req.body;
    const numeroFactura = generarNumeroFactura();
    const fecha = new Date().toISOString().slice(0, 10);
    let totalVentas = 0;
    for (let i = 0; i < ventas.length; i++) {
      let { cantidad, precioUni } = ventas[i];
      let resultado = cantidad * precioUni;
      totalVentas += resultado;
    }

    const { idusuarios, entrega, idformaDePago, idDomicilio } = ventas[0];
    const estado = "pendiente";

    // Creo la venta principal
    const queryVenta =
      "INSERT INTO ventas (numeroFactura,fecha,estado, entrega,total,idusuarios,idformaDePago, idDomicilio) values (?,?,?,?,?,?,?,?)";
    const values = [
      numeroFactura,
      fecha,
      estado,
      entrega,
      totalVentas,
      idusuarios,
      idformaDePago,
      idDomicilio,
    ];
    const [resultVenta] = await pool.query(queryVenta, values);

    //Tomo el idVenta
    const idventa = resultVenta.insertId;

    //Luego mapeo e inserto los detalles de ventas
    const queries = ventas.map(async (venta) => {
      const { precioUni, cantidad, idproductos } = venta;
      const total = precioUni * cantidad;
      const values = [
        fecha,
        precioUni,
        cantidad,
        total,
        idventa,
        idusuarios,
        idproductos,
      ];

      const queryDetalleVenta =
        "INSERT INTO detalle_venta (fecha, precioUni, cantidad, total, idventas, idusuarios,idproductos) VALUES (?, ?, ?, ?, ?, ?, ?)";
      await pool.query(queryDetalleVenta, values);

      const queryProductosVentas =
        "INSERT INTO productos_ventas (productos_idproductos, ventas_idventas) VALUES (?, ?)";
      await pool.query(queryProductosVentas, [idproductos, idventa]);
    });

    await Promise.all(queries);

    // Actualizo el total de la tabla ventas
    await pool.query("UPDATE ventas SET total = ? WHERE idventas = ?", [
      totalVentas,
      idventa,
    ]);

    //Doy de bajo el Stock
    await Promise.all(
      ventas.map((venta) =>
        modificarStockVenta(venta.idproductos, venta.cantidad)
      )
    );
    console.log("stock dado de baja");
    res.status(201).json("Venta registrada");
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const updateEstadoVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    console.log(estado, "Viene del front");
    if (!estado) {
      return res.status(400).json({ error: "El estado no puede venir vacío" });
    }
    const query = "UPDATE ventas SET estado = ? WHERE idventas = ?";
    const [rows] = await pool.query(query, [estado, id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro la venta a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM ventas WHERE idventas = ?",
      [id]
    );

    if (estado === "anulado") {
      const detalleVenta = await pool.query(
        "SELECT * FROM detalle_venta WHERE idventas = ?",
        [id]
      );

      await Promise.all(
        detalleVenta[0].map((el) =>
          modificarStockEstadoVenta(estado, el.idproductos, el.cantidad)
        )
      );
      console.log("Stock dado de alta por anulacion de venta");
    } 
 
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const deleteVentas = async (req, res) => {
  try {
    const { id } = req.params;
    const queryProductosVentas =
      "DELETE FROM productos_ventas WHERE ventas_idventas = ?";
    const queryDetalleVenta = "DELETE FROM detalle_venta WHERE idventas = ?";
    const queryVentas = "DELETE FROM ventas WHERE idventas = ?";
    await pool.query(queryProductosVentas, [id]);
    await pool.query(queryDetalleVenta, [id]);
    await pool.query(queryVentas, [id]);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};
