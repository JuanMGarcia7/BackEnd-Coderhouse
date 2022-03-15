import admin from "firebase-admin";

var serviceAccount = require("./db/basefirebase-96001-firebase-adminsdk-qoxk8-ced1109111.json");

const inicializacion = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://basefirebase-96001.com",
});

console.log("Firebase up");

module.exports = inicializacion;
