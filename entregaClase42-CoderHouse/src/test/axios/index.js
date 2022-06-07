import axios from "axios";

async function getUser() {
  try {
    const resultado = await axios.get("http://localhost:8000/home");
    console.log(resultado);
  } catch (error) {
    console.log(error);
  }
}

async function savePost(data) {
  try {
    const resultado = await axios.post(
      "http://localhost:8000/home",
      JSON.stringify(data)
    );
    console.log("data send", resultado);
  } catch (error) {
    console.log(error);
  }
}
async function actualizar(data) {
  try {
    const resultado = await axios.put(
      "http://localhost:8000/home/:id",
      JSON.stringify(data)
    );
    console.log("data actualizada", resultado);
  } catch (error) {
    console.log(error);
  }
}

async function borrar(data) {
  try {
    const resultado = await axios.delete("http://localhost:8000/home/:id");
    console.log("data borrada");
  } catch (error) {
    console.log(error);
  }
}
