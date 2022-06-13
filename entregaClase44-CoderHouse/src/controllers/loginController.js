const { Router } = require("express");
const path = require("path");

const getLogin = async (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/login.html"));
};

module.exports = { getLogin };
