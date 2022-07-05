const { Router } = require("express");
const { getLogOut } = require("../controllers/logOutController.js");

const logOut = new Router();

logOut.post("/logout", getLogOut);

module.exports = logOut;
