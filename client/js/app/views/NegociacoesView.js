import View from "./View.js";
import DateHelper from "../helpers/DateHelper.js";

export default class NegociacoesView extends View {
    constructor(container) {
        super(container);
    }

    template(model) {
        return `<table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
            ${model.negociacoes
                .map(
                    (negociacao) => `<tr>
                <td>${DateHelper.dateToStr(negociacao.data)}</td>
                <td>${negociacao.quantidade}</td>
                <td>${negociacao.valor}</td>
                <td>${negociacao.volume}</td>
                </tr>`
                )
                .join("")}
            </tbody>

            <tfoot>
                <td colspan="3"></td>
                <td>
                ${model.volumeTotal}
                </td>
            </tfoot>
        </table>`;
    }
}
