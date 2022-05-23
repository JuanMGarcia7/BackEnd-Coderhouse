const users = require("./schemaUserMongodb.js");
const logger = require("../../public/js/logs.js");

class ContenedorMongoDB {
  constructor() {}

  async listAll() {
    try {
      return await users.find({});
    } catch (error) {
      throw new Error(logger.error(`Error al listar todo: ${error}`));
    }
  }
  async findUser(id) {
    try {
      return await users.find(id);
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

module.exports = ContenedorMongoDB;
