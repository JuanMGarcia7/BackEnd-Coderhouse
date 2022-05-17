import users from "./schemaUserMongodb.js";

class ContenedorMongoDB {
  constructor() {}

  async listAll() {
    try {
      return await users.find({});
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }
  async findUser(email) {
    try {
      return await users.find(email);
    } catch (error) {
      throw new Error(`Error al listar: ${error}`);
    }
  }

  async save(newElement) {
    try {
      return await users.create(newElement);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}

export default ContenedorMongoDB;
