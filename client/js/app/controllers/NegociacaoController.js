import ListaNegociacoes from "../models/ListaNegociacoes.js";
import Mensagem from "../models/Mensagem.js";
import Negociacao from "../models/Negociacao.js";
import NegociacoesView from "../views/NegociacoesView.js";
import MensagemView from "../views/MensagemView.js";
import NegociacaoService from "../services/NegociacaoService.js";
import DateHelper from "../helpers/DateHelper.js";
import Bind from "../helpers/Bind.js";

export default class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._form = $(".form");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._inputData = $("#data");
        this._negociacaoService = new NegociacaoService();

        //Model ListaNegociacoes
        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($("#negociacoes-view")),
            "add",
            "addVarias",
            "esvazia"
        );

        //Model Mensagem
        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagem-view")),
            "texto"
        );

        this._init();
    }

    _init() {
        this.listaNegociacoes();

        setInterval(() => {
            this.importaNegociacoes();
        }, 3000);
    }

    adiciona(e) {
        e.preventDefault();

        let negociacao = this._criaNegociacao();
        this._negociacaoService
            .cadastrar(negociacao)
            .then((result) => {
                this._listaNegociacoes.add(negociacao);
                this._mensagem.texto = result;
                this._resetaFormulario();
            })
            .catch((erro) => {
                this._mensagem.texto = erro;
            });
    }

    apaga() {
        this._negociacaoService
            .apagar()
            .then((result) => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = result;
            })
            .catch((erro) => (this._mensagem.texto = erro));
    }

    _criaNegociacao() {
        return new Negociacao(
            Number(this._inputQuantidade.value),
            Number(this._inputValor.value),
            DateHelper.strToDate(this._inputData.value)
        );
    }

    _resetaFormulario() {
        this._form.reset();
        this._inputData.focus();
    }

    importaNegociacoes() {
        this._negociacaoService
            .importar(this._listaNegociacoes.negociacoes)
            .then((negociacoes) => {
                this._listaNegociacoes.addVarias(negociacoes);
                this._mensagem.texto = "Negociações importadas com sucesso!";
            })
            .catch((erro) => {
                this._mensagem.texto = erro;
            });
    }

    listaNegociacoes() {
        this._negociacaoService
            .listar()
            .then((listaNegociacoes) => {
                this._listaNegociacoes.addVarias(listaNegociacoes);
            })
            .catch((erro) => (this._mensagem.texto = erro));
    }
}
