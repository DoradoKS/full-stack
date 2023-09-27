const request = require("supertest");
const app = require("../index");

//definicion de var aux
const ticketAlta = {
    Tick_FechaVenta: "2022-12-01",
    Cli_DNI: 41521413,
    But_Fila: "T",
    But_Nro: 22,
    Proy_Codigo: 7,
  };
  const ticketModificacion = {
    Tick_FechaVenta: "2022-11-01",
    Cli_DNI: 77770506,
    But_Fila: "L",
    But_Nro: 22,
    Proy_Codigo: 7,
  };
  

// test GET
describe("GET /api/tickets", function () {
  it("Devolveria todos los tickets", async function () {
    const res = await request(app)
      .get("/api/tickets")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            Tick_Id: expect.any(Number),
            Tick_FechaVenta: expect.any(String),
            Cli_DNI: expect.any(Number),
            But_Fila: expect.any(String),
            But_Nro: expect.any(String),
            Proy_Codigo: expect.any(Number),
        }),
      ])
    );
  });
});

// test GET/ID
describe("GET /api/tickets/:id", function () {
  it("Devuelve un json que contiene un solo ticket con id 2", async function () {
    const res = await request(app)
      .get("/api/tickets/2");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Tick_Id: 2, //o expect.any(Number)
        Tick_FechaVenta: expect.any(String),
        Cli_DNI: expect.any(Number),
        But_Fila: expect.any(String),
        But_Nro: expect.any(String),
        Proy_Codigo: expect.any(Number),
      })
    );
  });
});
// test GETID fallido
describe("GET /api/tickets/:id", () => {
    it("Debería devolver un error si el Ticket no existe", async () => {
      const res = await request(app).get("/api/tickets/90");
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('No econtrado!!');
    });
  });

// test POST
describe("POST /api/tickets/", () => {
    it("Deberia devolver el ticket que acabo de crear", async () => {
      const res = await request(app).post("/api/tickets/").send(ticketAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
            Tick_FechaVenta: expect.any(String),
            Cli_DNI: expect.any(Number),
            But_Fila: expect.any(String),
            But_Nro: expect.any(Number),
            Proy_Codigo: expect.any(Number),
        })
      );
    });
  });
 
  // test PUT exitoso
  describe("PUT /api/tickets/:id", () => {
    it("Deberia devolver el ticket con el id 6 modificado", async () => {
      const res = await request(app).put("/api/tickets/6").send(ticketModificacion);
      expect(res.statusCode).toEqual(200);
    });
  });
  // test PUT fallido
  describe("PUT /api/tickets/:id", () => {
    it("Debería devolver un error si el Ticket no existe", async () => {
      const res = await request(app).put("/api/tickets/90").send(ticketModificacion);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe('Ticket no encontrado');
    });
  });

  // test DELETE notar que hay que cambiar el valor conforme realizamos las pruebas ya que va borrando los ids
  describe("DELETE /api/tickets/:id", () => {
    it("Deberia devolver el ticket con el id 15 borrado", async () => {
      const res = await request(app).delete("/api/tickets/14");
      expect(res.statusCode).toEqual(200);  
    });
});

// test DELETE fallido
describe("DELETE /api/tickets/:id", () => {
    it("Debería devolver un error si el Ticket no existe", async () => {
      const res = await request(app).delete("/api/tickets/90");
      expect(res.statusCode).toBe(404);
    });
  });
  