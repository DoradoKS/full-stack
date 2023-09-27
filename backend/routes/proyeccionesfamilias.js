const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/proyeccionesfamilias", async function (req, res, next) {
  let data = await db.proyeccions.findAll({
    attributes: ["Proy_Codigo", "Proy_Hora"],
  });
  res.json(data);
});


router.get("/api/proyeccionesfamilias/:id", async function (req, res, next) {
    // #swagger.tags = ['ArticulosFamilias']
    // #swagger.summary = 'obtiene un ArticuloFamilia'
    // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }
    let data = await db.proyeccions.findAll({
      attributes: ["Proy_Codigo", "Proy_Hora"],
      where: { Proy_Hora: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

module.exports = router;