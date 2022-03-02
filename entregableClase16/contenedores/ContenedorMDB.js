const { mdb } = require("../options/mariaDB.js");
const knex = require("knex")(mdb);
const moment = require("moment");

//PROBANDO CON LO NUEVO
class ContenedorMDB {
  constructor(title, price, thumb) {
    this.id = 0;
    this.title = title;
    this.price = price;
    this.thumb = thumb;
  }
  async createTable() {
    await knex.schema
      .createTableIfNotExists("productos", (table) => {
        table.increments("id");
        table.string("title");
        table.integer("price");
        table.string("thumbnail");
      })
      .then(() => console.log("Tabla creada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });
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
      });
  }
  async guardar(title, price, thumb) {
    let producto = new producto(title, price, thumb);
    knex
      .from("productos")
      .insert(producto)
      .then(() => console.log("data insertada"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    return "ok";
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
