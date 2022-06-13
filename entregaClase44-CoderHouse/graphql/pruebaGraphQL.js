/* const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("./controllersGQL.js");
const schema = require("./schemaGQL.js");
const app = express();

app.use(express.static("public"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProductos,
      getProducto,
      createProducto,
      updateProducto,
      deleteProducto,
    },
    graphiql: true,
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto: ${PORT}`;
  console.log(msg);
});
 */
