import routers from "./routers/index.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

routers(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servido escuchando en el puerto ${PORT}`));
