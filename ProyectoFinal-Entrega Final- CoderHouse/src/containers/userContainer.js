const users = require("../models/schemaUser.js");
const logger = require("../logs/logs.js");

class ContenedorUser {
  constructor() {}

  async listAll() {
    try {
      return await users.find({});
    } catch (error) {
      throw new Error(logger.error(`Error al listar todo: ${error}`));
    }
  }
  async findByID(id) {
    try {
      return await users.findOne({ id: id });
    } catch (error) {
      throw new Error(logger.error(`Error al listar: ${error}`));
    }
  }
  async findUserByEmail(email) {
    try {
      return await users.find({ email });
    } catch (error) {
      throw new Error(logger.error(`Error al listar: ${error}`));
    }
  }

  async save(newElement) {
    try {
      return await users.create(newElement);
    } catch (error) {
      throw new Error(logger.error(`Error al guardar: ${error}`));
    }
  }
}

module.exports = ContenedorUser;
