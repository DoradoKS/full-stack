const request = require("supertest");
const app = require("../index");

const peliAlta = {
  Peli_Titulo: "Pelicula Nueva",
  Peli_Duracion: "60 min",
  Peli_Genero: "Acción",
  Peli_Clase: "APT",
  Peli_FechaLanzamiento: "2023-05-01",
  Peli_CantVisualizaciones: 45,
};
const peliModificacion = {
  Peli_Titulo: "El Gran Escape",
  Peli_Duracion: "100 min",
  Peli_Genero: "Acción",
  Peli_Clase: "SAM13",
  Peli_FechaLanzamiento: "2023-06-01",
  Peli_CantVisualizaciones: 200,
};

// test GET
describe("GET /api/peliculas", function () {
  it("Devolveria todos las peliculas", async function () {
    const res = await request(app)
      .get("/api/peliculas")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Peli_Codigo: expect.any(Number),
          Peli_Titulo: expect.any(String),
          Peli_Duracion: expect.any(String),
          Peli_Genero: expect.any(String),
          Peli_Clase: expect.any(String),
          Peli_FechaLanzamiento: expect.any(String),
          Peli_CantVisualizaciones: expect.any(Number),
        }),
      ])
    );
  });
});


// test route/peliculas/:id GET
describe("GET /api/peliculas/:id", () => {
  it("Debería devolver la película con el id 1", async () => {
    const res = await request(app).get("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Peli_Codigo: expect.any(Number),
        Peli_Titulo: expect.any(String),
        Peli_Duracion: expect.any(String),
        Peli_Genero: expect.any(String),
        Peli_Clase: expect.any(String),
        Peli_FechaLanzamiento: expect.any(String),
        Peli_CantVisualizaciones: expect.any(Number),
      })
    );
  });
});
// test GETID fallido
describe("GET /api/peliculas/:id", () => {
  it("Debería devolver un error si la Pelicula no existe", async () => {
    const res = await request(app).get("/api/peliculas/90");
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('No econtrado!!');
  });
});

// test route/peliculas POST
describe("POST /api/peliculas/", () => {
  it("Debería devolver la película que acabo de crear", async () => {
    const res = await request(app).post("/api/peliculas/").send(peliAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Peli_Titulo: expect.any(String),
        Peli_Duracion: expect.any(String),
        Peli_Genero: expect.any(String),
        Peli_Clase: expect.any(String),
        Peli_FechaLanzamiento: expect.any(String),
        Peli_CantVisualizaciones: expect.any(Number),
      })
    );
  });
});

// test route/peliculas/:id PUT
describe("PUT /api/peliculas/:id", () => {
  it("Debería devolver la película con el id 1 modificada", async () => {
    const res = await request(app).put("/api/peliculas/1").send(peliModificacion);
    expect(res.statusCode).toEqual(200);
  });
});
// test PUT fallido
describe("PUT /api/peliculas/:id", () => {
  it("Debería devolver un error si la Pelicula no existe", async () => {
    const res = await request(app).put("/api/peliculas/90").send(peliModificacion);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Pelicula no encontrada');
  });
});

// test route/peliculas/:id DELETE
describe("DELETE /api/peliculas/:id", () => {
    it("Deberia devolver la pelicula con el id 11 borrado", async () => {
      const res = await request(app).delete("/api/peliculas/12");
      expect(res.statusCode).toEqual(200);
    }, 10000);
  });

// test DELETE fallido
describe("DELETE /api/peliculas/:id", () => {
  it("Debería devolver un error si la Pelicula no existe", async () => {
    const res = await request(app).delete("/api/peliculas/90");
    expect(res.statusCode).toBe(404);
  });
});