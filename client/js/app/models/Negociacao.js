export default class Negociacao {
    constructor(quantidade = 1, valor = 0, data = new Date()) {
        this._quantidade = quantidade;
        this._valor = valor;
        this._data = new Date(data.getTime());
        Object.freeze(this);
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get valor() {
        return this._valor;
    }

    get quantidade() {
        return this._quantidade;
    }

    eIgual(negociacao) {
        return JSON.stringify(this) === JSON.stringify(negociacao);
    }
}
