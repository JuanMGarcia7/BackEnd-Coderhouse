const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = {
    title: formAgregarProducto[0].value,
    price: formAgregarProducto[1].value,
    thumbnail: formAgregarProducto[2].value,
  };
  socket.emit("update", producto);
  formAgregarProducto.reset();
});

socket.on("productos", (productos) => {
  makeHtmlTable(productos).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

function makeHtmlTable(productos) {
  return fetch("plantillas/tabla-productos.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById("inputUsername");
const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

const formPublicarMensaje = document.getElementById("formPublicarMensaje");

formPublicarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  const mensaje = { autor: inputUsername.value, texto: inputMensaje.value };
  socket.emit("nuevoMensaje", mensaje);
  formPublicarMensaje.reset();
  inputMensaje.focus();
});
socket.on("users", (usuarios) => {
  usuarios = [...new Set(usuarios.map((item) => item.autor))]; // [ 'A', 'B']

  const html = usersShow(usuarios);
  document.getElementById("usuarios").innerHTML = html;
});

function usersShow(usuarios) {
  console.log(usuarios);
  return usuarios
    .map((usuario) => {
      let color = "black";

      let contentText = "flex-start";
      let backColor = "gainsboro";

      return `
          <div  style="display: flex; justify-content: ${contentText}">
              <b style="color:${color};">${usuario}</b> 
          </div>
      `;
    })
    .join("<br/>");
}
function makeHtmlList(mensajes) {
  /* return fetch("./index.hbs")
    .then((respuesta) => respuesta.text())
    .then((lista) => {
      const template = Handlebars.compile(lista);
      const html = template({ mensajes });
      return html;
    }); */
  console.log(mensajes);
  return mensajes
    .map((mensaje) => {
      let color = "black";

      let contentText = "flex-start";
      let backColor = "#ffffff";
      if (mensaje.socketId == socket.id) {
        contentText = "flex-end";
        backColor = "#dafdd3";
      }

      return `
          <div  style="background-color: ${backColor}; display: flex; justify-content: ${contentText}">
              <b style="color:${color};">${mensaje.autor}</b>
              [<span style="color:black;">${mensaje.fyh}</span>] :
              <i style="color:black;">${mensaje.texto}</i>
          </div>
      `;
    })

    .join("<br/>");
}
socket.on("mensajes", (mensajes) => {
  /* makeHtmlList(mensajes).then((html) => {
    document.getElementById("mensajes").innerHTML = html;
  }); */
  const html = makeHtmlList(mensajes);
  document.getElementById("mensajes").innerHTML = html;
});
//

inputUsername.addEventListener("input", () => {
  const hayEmail = inputUsername.value.length;
  const hayTexto = inputMensaje.value.length;
  inputMensaje.disabled = !hayEmail;
  btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener("input", () => {
  const hayTexto = inputMensaje.value.length;
  btnEnviar.disabled = !hayTexto;
});
