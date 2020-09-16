export default class HttpService {
    get(url) {
        return fetch(url)
            .then((response) => this._handleError(response))
            .then((response) => response.json());
    }

    post(url, dado) {
        return fetch(url, {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body: JSON.stringify(dado),
        })
            .then((response) => this._handleError(response))
            .then((response) => console.log(response));
    }

    _handleError(response) {
        if (!response.ok) {
            throw new Error("Erro de requisição.");
        }

        return response;
    }
}
