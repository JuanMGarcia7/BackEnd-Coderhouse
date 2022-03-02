const { sql3 } = require("../options/sqlite3.js");
const knex = require("knex")(sql3);

const { promises: fs } = require("fs");

class ContenedorSQLITE {
  async crearTableMsg() {
    knex.schema
      .createTableIfNotExists("messages", (table) => {
        table.increments("id");
        table.string("autor");
        table.string("fyh");
        table.string("texto");
      })
      .then(() => {
        console.log("tabla mensajes creada");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  async listarAll() {
    return await knex.from("messages").select("*");
  }

  async guardar(obj) {
    knex("messages")
      .insert(obj)
      .then(() => console.log("datos insertados"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    return "ok";
  }

  close() {
    return this.knex.destroy();
  }
}

module.exports = ContenedorSQLITE;

/* knex.schema
  .createTable("mensaje", (table) => {
    table.increments("id");
    table.string("name");
    table.string("fecha");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

  const productos =[
      {name: "mate", price : 2468},
      {name ="yerbera", price:2355}
  ]
  knex('productos').insert(productos)
  .then(()=>console.log("data insertada"))
  .catch((err)=>{console.log(err); throw err})
  .finally(()=>{
      knex.destroy()
  }) */
