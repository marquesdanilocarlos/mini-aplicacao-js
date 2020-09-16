export default class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop) {
                if (
                    props.includes(prop) &&
                    ProxyFactory.isFunction(target[prop])
                ) {
                    return function () {
                        let retorno = Reflect.apply(
                            target[prop],
                            target,
                            arguments
                        );
                        acao(target);
                        return retorno;
                    };
                }
                return target[prop];
            },

            set(target, prop, value) {
                target[prop] = value;
                if (props.includes(prop)) {
                    acao(target);
                }
                return target[prop];
            },
        });
    }

    static isFunction(prop) {
        return typeof prop == typeof Function;
    }
}
