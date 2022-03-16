import routers from "./routers/index.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cors(`${process.env.PORT}`));

routers(app);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servido escuchando en el puerto ${PORT}`));
