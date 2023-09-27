const request = require("supertest");
const app = require("../index");


const ProyAlta = {
    Proy_Fecha: "2022-12-01",
    Proy_Hora: "18:44",
    Proy_NroSala: 2,
    Peli_Codigo: 7,
  };
  const ProyModificacion = {
    Proy_Fecha: "2022-12-01",
    Proy_Hora: "18:45",
    Proy_NroSala: 1,
    Peli_Codigo: 7,
  };
  

// test GET
describe("GET /api/proyecciones", function () {
  it("Devolveria todas las proyecciones", async function () {
    const res = await request(app)
      .get("/api/proyecciones")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            Proy_Codigo: expect.any(Number),
            Proy_Fecha: expect.any(String),
            Proy_Hora: expect.any(String),
            Proy_NroSala: expect.any(Number),
            Peli_Codigo: expect.any(Number),
        }),
      ])
    );
  });
});

// test GET/ID
describe("GET /api/proyecciones/:id", function () {
  it("Devuelve un json que contiene la proyeccion con id 4", async function () {
    const res = await request(app)
      .get("/api/proyecciones/4");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Proy_Codigo: 4, //o expect.any(Number)
        Proy_Fecha: expect.any(String),
        Proy_Hora: expect.any(String),
        Proy_NroSala: expect.any(Number),
        Peli_Codigo: expect.any(Number),
      })
    );
  });
});
// test GETID fallido
describe("GET /api/proyecciones/:id", () => {
    it("Debería devolver un error si la proyeccion no existe", async () => {
      const res = await request(app).get("/api/proyecciones/234");
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Proyeccion no econtrada!!');
    });
  });

// test POST
describe("POST /api/proyecciones/", () => {
    it("Deberia devolver la proyeccion que acabo de crear", async () => {
      const res = await request(app).post("/api/proyecciones/").send(ProyAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            Proy_Codigo: expect.any(Number),
            Proy_Fecha: expect.any(String),
            Proy_Hora: expect.any(String),
            Proy_NroSala: expect.any(Number),
            Peli_Codigo: expect.any(Number),
        })
      );
    });
  });
 
  // test PUT exitoso
  describe("PUT /api/proyecciones/:id", () => {
    it("Deberia devolver la proyeccion con el id 3 modificado", async () => {
      const res = await request(app).put("/api/proyecciones/3").send(ProyModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  // test PUT fallido
  describe("PUT /api/proyecciones/:id", () => {
    it("Debería devolver un error si la proyeccion no existe", async () => {
      const res = await request(app).put("/api/proyecciones/90").send(ProyModificacion);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('La proyeccion no fue encontrada');
    });
  });

  // test DELETE notar que hay que cambiar el valor conforme realizamos las pruebas ya que va borrando los ids
  describe("DELETE /api/proyecciones/:id", () => {
    it("Deberia devolver la proyeccion con el id 10 borrado", async () => {
      const res = await request(app).delete("/api/proyecciones/12");
      expect(res.statusCode).toEqual(200);  
    });
});

// test DELETE fallido
describe("DELETE /api/proyecciones/:id", () => {
    it("Debería devolver un error si la proyeccion no existe", async () => {
      const res = await request(app).delete("/api/proyeccion/234");
      expect(res.statusCode).toBe(404);
    });
  });
  