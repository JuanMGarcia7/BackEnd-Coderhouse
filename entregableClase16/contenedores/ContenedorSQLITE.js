const { sql3 } = require("../options/sqlite3.js");
const knex = require("knex")(sql3);

class ContenedorSQLITE {
  constructor(sql3) {
    this.knex = knexFunc(sql3);
    this.mensajes = [];
    this.nextMsj = 0;
    this.timeStamp = moment().format("DD/MM/YYYY h:mm:ss a");
    this.codeProd = Math.round(Math.random() * 10000);
  }

  async listarAll() {
    await knex
      .from("mensajes")
      .select("*")
      .then((rows) => {
        for (row of rows) {
          console.log(`${row["id"]} ${row["name"]} ${row["mensaje"]} `);
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async listar(id) {
    await knex
      .from("mensajes")
      .where("id" == id)
      .then((rows) => {
        for (row of rows) {
          console.log(`${row["id"]} ${row["name"]} ${row["mensaje"]} `);
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
  async guardar(obj) {
    await knex
      .from("mensajes")
      .insert(obj)
      .then(() => console.log("data insertada"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
  async borrar(id) {
    await knex
      .from("mensajes")
      .where("id" == id)
      .del()
      .then(() =>
        console.log(
          `los mensajes enviados desde el ID ${id}, fueron eliminados`
        )
      )
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async borrarAll() {
    await knex
      .from("mensajes")
      .del()
      .then(() => console.log(`Todos los mensajes fueron eliminados`))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
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
