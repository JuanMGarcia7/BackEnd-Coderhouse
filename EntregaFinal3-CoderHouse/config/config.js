import dotenv from "dotenv";
dotenv.config();
const MONGO_DB = process.env.MONGOURL;

const mongodb = {
  conexion: MONGO_DB,
};
export default mongodb;
