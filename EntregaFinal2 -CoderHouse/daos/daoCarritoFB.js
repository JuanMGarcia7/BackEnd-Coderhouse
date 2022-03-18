import dotenv from "dotenv";
dotenv.config();
import contenedorFirebase from "../componentes/contenedores/contenedorFirebase.js";

const cartsApi = new contenedorFirebase("carts");
export default cartsApi;
