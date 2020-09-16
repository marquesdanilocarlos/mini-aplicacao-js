export default class ListaNegociacoes {
    constructor() {
        this._negociacoes = [];
    }

    add(negociacao) {
        this._negociacoes.push(negociacao);
    }

    addVarias(arrayNegociacoes) {
        this._negociacoes = [...this._negociacoes, ...arrayNegociacoes];
    }

    esvazia() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [...this._negociacoes];
    }

    get volumeTotal() {
        return this.negociacoes.reduce(
            (total, negociacao) => total + negociacao.volume,
            0
        );
    }
}
