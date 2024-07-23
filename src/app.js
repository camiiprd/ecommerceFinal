import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import UsuariosClientesRoutes from './routes/GestionUsuarios/UsuariosClientes.Routes.js';
import proveedoresRoutes from './routes/GestionProveedores/Proveedores.routes.js'
import productosRoutes from './routes/GestionProductos/productos.routes.js'
import categoriasRoutes from './routes/GestionCategorias/categorias.routes.js'
import formaPagosRoutes from './routes/GestionMedioPagos/medioPagos.routes.js';
import ventasRoutes from './routes/GestionVentas/ventas.routes.js'
import domiciliosRoutes from './routes/GestionDomicilios/domicilios.routes.js'


const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));



app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use('/api',UsuariosClientesRoutes);
app.use('/api', proveedoresRoutes);
app.use('/api', productosRoutes);
app.use('/api', categoriasRoutes);
app.use('/api', formaPagosRoutes);
app.use('/api', ventasRoutes);
app.use('/api', domiciliosRoutes);



export default app;
