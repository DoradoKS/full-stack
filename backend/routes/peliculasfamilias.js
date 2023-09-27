const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/peliculasfamilias", async function (req, res, next) {
  let data = await db.peliculas.findAll({
    attributes: ["Peli_Codigo", "Peli_Titulo"],
  });
  res.json(data);
});


router.get("/api/peliculasfamilias/:id", async function (req, res, next) {
    // #swagger.tags = ['ArticulosFamilias']
    // #swagger.summary = 'obtiene un ArticuloFamilia'
    // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }
    let data = await db.peliculas.findAll({
      attributes: ["Peli_Codigo", "Peli_Titulo"],
      where: { Peli_Titulo: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
  });

module.exports = router;