const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/ticketsfamilias", async function (req, res, next) {
  let data = await db.tickets.findAll({
    attributes: ["Tick_Id", "But_Fila"],
  });
  res.json(data);
});


router.get("/api/ticketsfamilias/:id", async function (req, res, next) {
    // #swagger.tags = ['ArticulosFamilias']
    // #swagger.summary = 'obtiene un ArticuloFamilia'
    // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }
    let data = await db.tickets.findAll({
      attributes: ["Tick_Id", "But_Fila"],
      where: { Tick_Id: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

module.exports = router;