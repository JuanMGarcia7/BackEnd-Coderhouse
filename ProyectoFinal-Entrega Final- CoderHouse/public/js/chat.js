const socket = io();

//elementos del DOM
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", function () {
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });
  message.value = "";
  username.value = "";
});

message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username.value);
  actions.innerHTML += "";
});

socket.on("chat:message", function (data) {
  actions.innerHTML += "";
  output.innerHTML += `<p>
    <strong>${data.username}</strong>:${data.message}
    </p>`;
  actions.innerHTML += "";
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p><em>${data} is typing..</em></p>`;
});
