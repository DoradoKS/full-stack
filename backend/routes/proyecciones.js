const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


router.get("/api/proyecciones", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de articulos con filtros y paginacion

  let where = {};
  if (req.query.Proy_Hora != undefined && req.query.Proy_Hora !== "") {
    where.Proy_Hora = {
      [Op.like]: "%" + req.query.Proy_Hora + "%",
    };
  } 

  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.proyeccions.findAndCountAll({
    attributes: [
      "Proy_Codigo",
      "Proy_Fecha",
      "Proy_Hora",
      "Proy_NroSala",
      "Peli_Codigo",
    ],
    order: [["Proy_Hora", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });
  return res.json({ Items: rows, RegistrosTotal: count });
});



router.get("/api/proyecciones/:id", async function (req, res, next) {
  // #swagger.tags = ['Tickets']
  // #swagger.summary = 'obtiene un Ticket'
  // #swagger.parameters['id'] = { description: 'identificador del Ticket...' }
  let items = await db.proyeccions.findOne({
    attributes: [
      "Proy_Codigo",
      "Proy_Fecha",
      "Proy_Hora",
      "Proy_NroSala",
      "Peli_Codigo",
    ],
    where: { Proy_Codigo: req.params.id },
  });
  if (items) res.json(items);
  else res.status(404).json({message:'Proyeccion no econtrada!!'})
});

router.post("/api/proyecciones/", async (req, res) => {
  // #swagger.tags = ['Tickets']
  // #swagger.summary = 'agrega un Tickets'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Ticket',
                schema: { $ref: '#/definitions/Tickets' }
    } */
  try {
    let data = await db.proyeccions.create({
      Proy_Fecha: req.body.Proy_Fecha,
      Proy_Hora: req.body.Proy_Hora,
      Proy_NroSala: req.body.Proy_NroSala,
      Peli_Codigo: req.body.Peli_Codigo,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/proyecciones/:id", async (req, res) => {
  try {
    let item = await db.proyeccions.findOne({
      attributes: [
        "Proy_Codigo",
        "Proy_Fecha",
        "Proy_Hora",
        "Proy_NroSala",
        "Peli_Codigo",
      ],
      where: { Proy_Codigo: req.params.id },
    });
    if (!item) {
      res.status(404).json({ message: "La proyeccion no fue encontrada" });
      return;
    }
      item.Proy_Fecha= req.body.Proy_Fecha;
      item.Proy_Hora= req.body.Proy_Hora;
      item.Proy_NroSala= req.body.Proy_NroSala;
      item.Peli_Codigo= req.body.Peli_Codigo;
   
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



router.delete("/api/proyecciones/:id", async (req, res) => {
  let filasBorradas = await db.proyeccions.destroy({
    where: { Proy_Codigo: req.params.id },
  });
  if (filasBorradas == 1) res.sendStatus(200);
  else res.sendStatus(404);
});


module.exports = router;
