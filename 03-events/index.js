const EventEmitter = require("events");
class MeuEmissor extends EventEmitter {}
const meuEmissor = new MeuEmissor();
const nomeEvento = "usuario:click";

// Isso é um observador
meuEmissor.on(nomeEvento, (click) => {
	console.log("um usuario clickou", click);
});

// Simulando eventos
// meuEmissor.emit(nomeEvento, "na barra de rolagem");
// meuEmissor.emit(nomeEvento, "no botão ok");

// let count = 0;
// setInterval(() => {
// 	meuEmissor.emit(nomeEvento, "no botão ok" + count++);
// }, 2000);

const stdin = process.openStdin();
stdin.addListener("data", function (value) {
	console.log(`Você digitou: ${value.toString().trim()}`);
});
