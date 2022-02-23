const { mdb } = require("../options/mariaDB.js");
const knex = require("knex")(mdb);

//PROBANDO CON LO NUEVO
class ContenedorMDB {
  constructor(mdb) {
    this.knex = knexFunc(mdb);
    this.PRODUCTS_DB = [];
    this.nextProdDb = 0;
    this.timeStamp = moment().format("DD/MM/YYYY h:mm:ss a");
    this.codeProd = Math.round(Math.random() * 10000);
  }

  async listarAll() {
    await knex
      .from("productos")
      .select("*")
      .then((rows) => {
        for (row of rows) {
          console.log(`${row["id"]} ${row["name"]} ${row["price"]} `);
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
      .from("productos")
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

  async listar(id) {
    await knex
      .from("productos")
      .where("id" == id)
      .then((rows) => {
        for (row of rows) {
          console.log(`${row["id"]} ${row["name"]} ${row["price"]} `);
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

  async borrar(id) {
    await knex
      .from("productos")
      .where("id" == id)
      .del()
      .then(() => console.log(`el producto con ID ${id}, fue eliminado`))
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
      .from("productos")
      .del()
      .then(() => console.log(`Productos fue eliminado`))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
}
const prod = new ContenedorMDB(mdb);

module.exports = ContenedorMDB;
/* class ContenedorMDB {
  constructor(config, NombreDeTabla) {
    (config = this.config), (NombreDeTabla = this.NombreDeTabla);
  }

  async listarAll() {
    await knex
      .from("productos")
      .select("*")
      .then((rows) => {
        for (row of rows) {
          console.log(`${row["id"]} ${row["name"]} ${row["price"]} `);
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
    await knex("productos")
      .where("id" == id)
      .then((rows) => {
        for (row of rows) {
          console.log(`${row["id"]} ${row["name"]} ${row["price"]} `);
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

  async borrar(id) {
    await knex("productos")
      .where("id" == id)
      .del()
      .then(() => console.log(`el producto con ID ${id}, fue eliminado`))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  async borrarAll() {
    await knex("productos")
      .del()
      .then(() => console.log(`Productos fue eliminado`))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }
} 

knex.schema
  .createTable("productos", (table) => {
    table.increments("id");
    table.string("name");
    table.integer("price");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

knex("productos")
  .insert(productos)
  .then(() => console.log("data insertada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });*/
