const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


  router.get("/api/tickets", async function (req, res, next) {
    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Articulos'
    // consulta de articulos con filtros y paginacion
  
    let where = {};
    if (req.query.But_Fila != undefined && req.query.But_Fila !== "") {
      where.But_Fila = {
        [Op.like]: "%" + req.query.But_Fila + "%",
      };
    } 

    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.tickets.findAndCountAll({
      attributes: [
        "Tick_Id", 
        "Tick_FechaVenta", 
        "Cli_DNI", 
        "But_Fila", 
        "But_Nro", 
        "Proy_Codigo",
      ],
      order: [["But_Fila", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });
  
    return res.json({ Items: rows, RegistrosTotal: count });
  });


  router.get("/api/tickets/:id", async function (req, res, next) {
    // #swagger.tags = ['Tickets']
    // #swagger.summary = 'obtiene un Ticket'
    // #swagger.parameters['id'] = { description: 'identificador del Ticket...' }
    let items = await db.tickets.findOne({
      attributes: [
        "Tick_Id", 
        "Tick_FechaVenta", 
        "Cli_DNI", 
        "But_Fila", 
        "But_Nro", 
        "Proy_Codigo",
      ],
      where: { Tick_Id: req.params.id },
    });
    if (items) res.json(items);
    else res.status(404).json({message:'No econtrado!!'})
  });


  router.post("/api/tickets/", async (req, res) => {
    // #swagger.tags = ['Tickets']
    // #swagger.summary = 'agrega un Tickets'
    /*    #swagger.parameters['item'] = {
                  in: 'body',
                  description: 'nuevo Ticket',
                  schema: { $ref: '#/definitions/Tickets' }
      } */
    try {
      let data = await db.tickets.create({
        Tick_FechaVenta: req.body.Tick_FechaVenta,
        Cli_DNI: req.body.Cli_DNI,
        But_Fila: req.body.But_Fila,
        But_Nro: req.body.But_Nro,
        Proy_Codigo: req.body.Proy_Codigo,
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

  router.put("/api/tickets/:id", async (req, res) => {
    // #swagger.tags = ['Tickets']
    // #swagger.summary = 'actualiza un Ticket'
    // #swagger.parameters['id'] = { description: 'identificador del Ticket...' }
    /*    #swagger.parameters['Ticket'] = {
                  in: 'body',
                  description: 'Ticket a actualizar',
                  schema: { $ref: '#/definitions/Tickets' }
      } */
  
    try {
      let item = await db.tickets.findOne({
        attributes: [
          "Tick_Id", 
          "Tick_FechaVenta", 
          "Cli_DNI", 
          "But_Fila", 
          "But_Nro", 
          "Proy_Codigo",
        ],
        where: { Tick_Id: req.params.id },
      });
      if (!item) {
        res.status(404).json({ message: "Ticket no encontrado" });
        return;
      }
      item.Tick_FechaVenta = req.body.Tick_FechaVenta;
      item.Cli_DNI = req.body.Cli_DNI;
      item.But_Fila = req.body.But_Fila;
      item.But_Nro = req.body.But_Nro;
      item.Proy_Codigo = req.body.Proy_Codigo;
      await item.save();
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
  
  router.delete("/api/tickets/:id", async (req, res) => {
    // #swagger.tags = ['Tickets']
    // #swagger.summary = 'elimina un Ticket'
    // #swagger.parameters['id'] = { description: 'identificador del Ticket..' }
    let filasBorradas = await db.tickets.destroy({
      where: { Tick_Id: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  });
  

module.exports = router;
