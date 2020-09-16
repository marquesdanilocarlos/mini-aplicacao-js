import HttpService from "./HttpService.js";
import ConnectionFactory from "./ConnectionFactory.js";
import NegociacaoDAO from "../DAO/NegociacaoDAO.js";
import Negociacao from "../models/Negociacao.js";

export default class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterTodasNegociacoes() {
        return Promise.all([
            this._http.get("negociacoes/semana"),
            this._http.get("negociacoes/anterior"),
            this._http.get("negociacoes/retrasada"),
        ])
            .then((negociacoes) => {
                return this._converteNegociacoes(
                    negociacoes.reduce((arrayFinal, arrayNegociacoes) => {
                        return arrayFinal.concat(arrayNegociacoes);
                    }),
                    []
                );
            })
            .catch((erro) => {
                return erro;
            });
    }

    obterNegociacoesSemana() {
        return this._http
            .get("negociacoes/semana")
            .then((negociacoes) => {
                return this._converteNegociacoes(negociacoes);
            })
            .catch((erro) => {
                return erro;
            });
    }

    obterNegociacoesSemanaAnterior() {
        return this._http
            .get("negociacoes/anterior")
            .then((negociacoes) => {
                return this._converteNegociacoes(negociacoes);
            })
            .catch((erro) => {
                return erro;
            });
    }

    obterNegociacoesSemanaRetrasada() {
        return this._http
            .get("negociacoes/retrasada")
            .then((negociacoes) => {
                return this._converteNegociacoes(negociacoes);
            })
            .catch((erro) => {
                return erro;
            });
    }

    cadastrar(negociacao) {
        return ConnectionFactory.getConnection()
            .then((connection) => new NegociacaoDAO(connection).add(negociacao))
            .then(() => "Negociação adicionada com sucesso!")
            .catch((erro) => {
                throw new Error(erro);
            });
    }

    listar() {
        return ConnectionFactory.getConnection()
            .then((connection) => new NegociacaoDAO(connection).lista())
            .catch((erro) => {
                throw new Error(erro);
            });
    }

    apagar() {
        return ConnectionFactory.getConnection()
            .then((connection) => new NegociacaoDAO(connection).apagaTodos())
            .then(() => "Negociações apagadas com sucesso")
            .catch((erro) => {
                throw new Error(erro);
            });
    }

    importar(listaAtual) {
        return this.obterTodasNegociacoes()
            .then((negociacoes) =>
                negociacoes.filter(
                    (negociacao) =>
                        !listaAtual.some((negociacaoExistente) =>
                            negociacaoExistente.eIgual(negociacao)
                        )
                )
            )
            .catch((erro) => {
                throw new Error(erro);
            });
    }

    _converteNegociacoes(itens) {
        return itens.map((negociacao) => {
            return new Negociacao(
                negociacao.quantidade,
                negociacao.valor,
                new Date(negociacao.data)
            );
        });
    }
}
