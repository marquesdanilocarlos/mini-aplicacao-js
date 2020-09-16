import View from "./View.js";

export default class MensagemView extends View {
    constructor(container) {
        super(container);
    }

    template(model) {
        return model.texto
            ? `<p class="alert alert-info">${model.texto}</p>`
            : "<p></p>";
    }
}
