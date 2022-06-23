const prodDaoMongo = require("../dao/prodDao.js");
const prodApi = new prodDaoMongo();

const getProducts = async (ctx) => {
  const listaProductos = await prodApi.listAll();
  console.log(listaProductos);
  try {
    ctx.body = {
      status: "success",
      message: listaProductos,
    };
  } catch {
    console.log("Error en getProducts");
  }
};

const postProducts = async (ctx) => {
  const listaProductos = await prodApi.listAll();

  const producto = {
    id: ctx.request.body.id,
    nombre: ctx.request.body.nombre,
    precio: ctx.request.body.precio,
  };
  const yaExiste = listaProductos.find((e) => e.nombre == producto.nombre);
  try {
    if (yaExiste) {
      ctx.body = {
        status: "ya existe",
        message: yaExiste,
      };
    } else {
      prodApi.save(producto);

      ctx.body = {
        status: "success",
        message: producto,
      };
    }
  } catch {
    console.log("Error en postProducts");
  }
};
const getById = async (ctx) => {
  try {
    const IDProducto = ctx.params.id;
    const listaProductos = await prodApi.listAll();
    const yaExiste = listaProductos.find((e) => e.id == IDProducto);

    if (yaExiste) {
      ctx.body = {
        status: "success",
        message: yaExiste,
      };
    } else {
      console.log("ID no encontrado");
    }
  } catch {
    console.log("Error en el getByID");
  }
};
const deleteByID = async (ctx) => {
  try {
    let IDProducto = ctx.params.id;
    let prodeLiminado = await prodApi.delete(IDProducto);

    ctx.body = {
      status: "success",
      message: prodeLiminado,
    };
  } catch {
    console.log("Error en eliminar");
  }
};

module.exports = { getProducts, postProducts, getById, deleteByID };
