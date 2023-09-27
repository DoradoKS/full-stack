const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

  router.get("/api/peliculas", async function (req, res, next) {
    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Articulos'
    // consulta de articulos con filtros y paginacion
  
    let where = {};
    if (req.query.Peli_Titulo != undefined && req.query.Peli_Titulo !== "") {
      where.Peli_Titulo = {
        [Op.like]: "%" + req.query.Peli_Titulo + "%",
      };
    } 

    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.peliculas.findAndCountAll({
      attributes: [
        "Peli_Codigo",
        "Peli_Titulo",
        "Peli_Duracion",
        "Peli_Genero",
        "Peli_Clase",
        "Peli_FechaLanzamiento",
        "Peli_CantVisualizaciones",
      ],
      order: [["Peli_Titulo", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
    return res.json({ Items: rows, RegistrosTotal: count });
  });

router.get("/api/peliculas/:id", async function (req, res, next) {
  let item = await db.peliculas.findOne({
    attributes: [
      "Peli_Codigo",
      "Peli_Titulo",
      "Peli_Duracion",
      "Peli_Genero",
      "Peli_Clase",
      "Peli_FechaLanzamiento",
      "Peli_CantVisualizaciones",
    ],
    where: { Peli_Codigo: req.params.id },
  });
  if (item) res.json(item);
  else res.status(404).json({message:'No econtrado!!'})
});

router.post("/api/peliculas/", async (req, res) => {
  try {
    let data = await db.peliculas.create({
      Peli_Titulo: req.body.Peli_Titulo,
      Peli_Duracion: req.body.Peli_Duracion,
      Peli_Genero: req.body.Peli_Genero,
      Peli_Clase: req.body.Peli_Clase,
      Peli_FechaLanzamiento: req.body.Peli_FechaLanzamiento,
      Peli_CantVisualizaciones: req.body.Peli_CantVisualizaciones,
    });
    res.status(200).json(data.dataValues);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      throw err;
    }
  }
});

router.put("/api/peliculas/:id", async (req, res) => {
  try {
    let item = await db.peliculas.findOne({
      attributes: [
        "Peli_Codigo",
        "Peli_Titulo",
        "Peli_Duracion",
        "Peli_Genero",
        "Peli_Clase",
        "Peli_FechaLanzamiento",
        "Peli_CantVisualizaciones",
      ],
      where: { Peli_Codigo: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "Pelicula no encontrada" });
      return;
    }
    item.Peli_Titulo = req.body.Peli_Titulo;
    item.Peli_Duracion = req.body.Peli_Duracion;
    item.Peli_Genero = req.body.Peli_Genero;
    item.Peli_Clase = req.body.Peli_Clase;
    item.Peli_FechaLanzamiento = req.body.Peli_FechaLanzamiento;
    item.Peli_CantVisualizaciones =  req.body.Peli_CantVisualizaciones;
    await item.save();

    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      throw err;
    }
  }
});

router.delete("/api/peliculas/:id", async (req, res) => {
    let filasBorradas = await db.peliculas.destroy({
      where: { Peli_Codigo: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
});

module.exports = router;
