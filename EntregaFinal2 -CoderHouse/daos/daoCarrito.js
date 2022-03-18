import dotenv from "dotenv";
dotenv.config();
import contenedorMongo from "../componentes/contenedores/contenedorMongo.js";
import cartSchema from "../componentes/carts/cartSchema.js";

const cartsApi = new contenedorMongo("carts", cartSchema);
export default cartsApi;
