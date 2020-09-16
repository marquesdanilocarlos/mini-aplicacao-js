import NegociacaoController from "./app/controllers/NegociacaoController.js";

let negociacaoController = new NegociacaoController();

document.querySelector(".form").addEventListener("submit", (e) => {
    negociacaoController.adiciona();
});

document.querySelector("#botao-apagar").addEventListener("click", (e) => {
    negociacaoController.apaga();
});
