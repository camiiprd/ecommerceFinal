import app from './app.js';

// Puerto en el que el servidor escucha solicitudes HTTP
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server funcionando en el puerto', PORT);
});
