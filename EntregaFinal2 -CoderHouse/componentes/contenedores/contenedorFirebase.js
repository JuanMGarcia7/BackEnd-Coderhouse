import admin from "firebase-admin";
import moment from "moment";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

export default class contenedorFirebase {
  constructor(coleccion) {
    this.coleccion = db.collection(coleccion);
  }

  async listarAll() {
    try {
      const resultado = [];
      const querySnapshot = await this.coleccion.get();
      querySnapshot.forEach((doc) => {
        resultado.push({ id: doc.id, ...doc.data });
      });

      console.log(resultado);
    } catch (error) {
      console.log(`Error al listar todo: ${error}`);
    }
  }

  async listarID(id) {
    try {
      let idBuscado = id;
      const buscado = await this.coleccion.doc(`${idBuscado}`).get();
      if (!buscado.exists) {
        console.log("Error al buscar.");
      } else {
        console.log(buscado);
      }
    } catch (error) {
      console.log(`Error al buscar: ${error}`);
    }
  }

  async guardar(newElement) {
    newElement.timestamp = moment(new Date()).format("DD/MM/YY HH:mm");
    try {
      const doc = await this.coleccion.add(newElement);
      return { ...newElement, id: doc.id };

      //  O ESTO
      /* const doc = query.doc();
      await doc.create(newElement); */
    } catch (error) {
      console.log(`Error al guardar: ${error}`);
    }
  }

  async update(id, newData) {
    newData.timestamp = moment(new Date()).format("DD/MM/YY HH:mm");
    try {
      const buscado = await this.coleccion.doc(id).set(newData);
      console.log(buscado);
    } catch (error) {
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      const borrarTodo = await this.coleccion.doc().delete();

      console.log("Data eliminada", borrarTodo);
    } catch (error) {
      console.log(`Error al borrar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      let idUsuario = id;
      const usuario = await this.coleccion.doc(`${idUsuario}`).delete();

      console.log("Eliminado", usuario);
    } catch (error) {
      console.log(`Error al borrar: ${error}`);
    }
  }
}
