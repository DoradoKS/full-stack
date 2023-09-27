const express = require("express");
const cors = require('cors');
// crear servidor
const app = express();

app.use(express.json()); // para poder leer json en el body
require("./base-orm/sqlite-init");  // crear base si no existe
app.use(cors());
// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const peliculas = require("./routes/peliculas");
app.use(peliculas);
const peliculasfamiliasRouter = require("./routes/peliculasfamilias");
app.use(peliculasfamiliasRouter);
const proyecciones = require("./routes/proyecciones");
app.use(proyecciones);
const proyeccionesfamiliasRouter = require("./routes/proyeccionesfamilias");
app.use(proyeccionesfamiliasRouter);
const ticketsR = require("./routes/tickets");
app.use(ticketsR);
const ticketsfamiliasRouter = require("./routes/ticketsfamilias");
app.use(ticketsfamiliasRouter);
// levantar servidor
if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}
module.exports = app; // para testing
