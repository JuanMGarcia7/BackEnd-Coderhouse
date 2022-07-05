const { users, usersSchema } = require("../models/schemaProd.js");
const ContenedorUser = require("../containers/userContainer.js");

class userDAO extends ContenedorUser {
  constructor() {
    super("users", usersSchema);
  }
}

module.exports = userDAO;
