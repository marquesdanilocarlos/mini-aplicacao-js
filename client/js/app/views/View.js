export default class View {
    constructor(container) {
        this._container = container;
    }

    template(model) {
        throw new Error("O método _template() deve ser implementado.");
    }

    update(model) {
        this._container.innerHTML = this.template(model);
    }
}
