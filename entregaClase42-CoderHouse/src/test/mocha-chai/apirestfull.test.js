const supertest = require("supertest");
const chai = require("chai").expect;
const httpServer = require("../../index.js");

const producto = {
  id: 10,
  nombre: "prod 10",
  precio: 10000,
};

let PRODUCT_ID_EDIT = 8;
const urlTest = `/home/${PRODUCT_ID_EDIT}`;

describe("Test apiRestFull ", () => {
  describe("test GET", () => {
    it("debería retornar la lista de productos", (done) => {
      supertest(httpServer).get("/api/productos/").expect(200, done());
    });
  });

  describe("test update/PUT", () => {
    it("Modificar producto por id", (done) => {
      producto.nombre = "placa de video NUEVA ";
      producto.precio = 153700;
      supertest(httpServer)
        .put(urlTest)
        .send(producto)
        .expect(200, (req, res) => {
          console.log(producto);
          done();
        });
    });
  });

  describe("test borrar /DELETE", () => {
    it("Eliminar por ID", (done) => {
      supertest(httpServer)
        .delete(urlTest)
        .expect(200, (req, res) => {
          console.log("prod eliminado");
          done();
        });
    });
  });

  describe("test POST", () => {
    it("Prod agregado", (done) => {
      supertest(httpServer)
        .post("/home")
        .send(producto)
        .expect(200, (req, res) => {
          console.log(res.body);
          done();
        });
    });
  });
});
