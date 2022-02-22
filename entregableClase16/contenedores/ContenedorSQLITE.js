const { options } = require("../options/sqlite3.js");
const knex = require("knex")(options);

class ContenedorSQLITE {
    constructor(config, NombreDeTabla) {
        (config = this.config), (NombreDeTabla = this.NombreDeTabla);
      }


  //FALTA AG4REGAR LA CLASE, POR ESO EL ERROR
  async listarAll(){
       await knex.from('productos').select("*")
      .then((rows)=>{
          for (row of rows){
              console.log(`${row['id']} ${row['name']} ${row['price']} `)
          }
      })
      .catch((err)=>{console.log(err ); throw err})
      .finally(()=>{
          knex.destroy()
      })
  }


 async  listar(id) {
    await knex('productos')
    .where('id' == id)
    .then((rows)=>{
        for (row of rows){
            console.log(`${row['id']} ${row['name']} ${row['price']} `)
        }
    })
    .catch((err)=>{console.log(err ); throw err})
    .finally(()=>{
        knex.destroy()
    })
    
 }


  async borrar(id) {
   await knex('productos')
   .where('id' == id).del()
   .then(()=>console.log(`el producto con ID ${id}, fue eliminado`))
   .catch((err)=>{console.log(err); throw err})
   .finally(()=>{
       knex.destroy()
   })
   
}

async borrarAll(){
   await knex('productos').del()
    .then(()=>console.log(`Productos fue eliminado`))
   .catch((err)=>{console.log(err); throw err})
   .finally(()=>{
       knex.destroy()
   })
}


}

module.exports = ContenedorSQLITE

knex.schema
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
  })