const { buildSchema } = require("graphql");

const schema = buildSchema(`
  input ProductoInput {
    nombre: String,
    precio: Int
  }
  type Producto {
    id: ID!
    nombre: String,
    precio: Int
  }
  type Query {
    getProducto(id: ID!): Producto,
    getProductos(campo: String, valor: String): [Producto],
  }
  type Mutation {
    createProducto(datos: ProductoInput): Producto
    updateProducto(id: ID!, datos: ProductoInput): Producto,
    deleteProducto(id: ID!): Producto,
  }
`);
module.exports = schema;
