const stores = ["negociacoes"];
const version = 4;
const dbName = "aluraframe";
let connection = null;
let closeOriginal = null;

export default class ConnectionFactory {
    constructor() {
        throw new Error("A classe ConnectionFactory não pode ser instanciada.");
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open(dbName, version);

            openRequest.onupgradeneeded = (e) => {
                ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = (e) => {
                if (!connection) {
                    connection = e.target.result;
                    closeOriginal = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error(
                            "Não é possível fechar diretamente a conexão."
                        );
                    };
                }
                resolve(connection);
            };

            openRequest.onerror = (e) => {
                let error = e.target.error.name;
                console.log(error);
                reject(error);
            };
        });
    }

    static _closeConnection() {
        if (connection) {
            closeOriginal();
            connection = null;
        }
    }

    static _createStores(connection) {
        stores.forEach((store) => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, {
                autoIncrement: true,
            });
        });
    }
}
