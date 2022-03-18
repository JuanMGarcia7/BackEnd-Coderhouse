import dotenv from "dotenv";
dotenv.config();
import contenedorMongo from "../componentes/contenedores/contenedorMongo.js";
import prodSchema from "../componentes/productos/prodSchema.js";

const productosApi = new contenedorMongo("products", prodSchema);

export default productosApi;
