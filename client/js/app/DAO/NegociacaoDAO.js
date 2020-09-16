import Negociacao from "../models/Negociacao.js";

export default class NegociacaoDAO {
    constructor(connection) {
        this._connection = connection;
        this._store = "negociacoes";
    }

    add(negociacao) {
        return new Promise((resolve, reject) => {
            let addRequest = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociacao);

            addRequest.onsuccess = (e) => {
                resolve(true);
                console.log("Negociação incluída com sucesso!");
            };

            addRequest.onerror = (e) => {
                reject("Não foi possível incluir a negociação");
                console.log(e.target.error.name);
            };
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            let negociacoes = [];

            let cursor = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .openCursor();

            cursor.onsuccess = (e) => {
                let itemAtual = e.target.result;

                if (!itemAtual) {
                    resolve(negociacoes);
                    return;
                }

                let negociacao = itemAtual.value;

                negociacoes.push(
                    new Negociacao(
                        negociacao._quantidade,
                        negociacao._valor,
                        negociacao._data
                    )
                );

                itemAtual.continue();
            };

            cursor.onerror = (e) => {
                reject("Não foi possível obter as negociações");
                console.log(e.target.error.name);
            };
        });
    }

    apagaTodos() {
        return new Promise((resolve, reject) => {
            let clearRequest = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .clear();

            clearRequest.onsuccess = (e) =>
                resolve("Negociações removidas com sucesso!");
            clearRequest.onerror = (e) => {
                reject("Não foi possível remover as negociações");
                console.log(e.target.error);
            };
        });
    }
}
