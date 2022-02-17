class Administrador {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }
}

const email = new Administrador();
const password = new Administrador();

if (typeof window === "object") {
  // Check if document is finally loaded
  document.addEventListener("DOMContentLoaded", function () {
    email = document.getElementById("email");
    password = document.getElementById("Contraseña");

    if ((email = "example@admin") && (password = "123456")) {
      const usuario = admin;
    } else {
      const usuario = cliente;
    }
  });
}

module.exports = Administrador;
