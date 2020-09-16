export default class DateHelper {
    constructor() {
        throw new Error("Esta classe não pode ser instanciada");
    }

    static strToDate(strDate) {
        if (!new RegExp(/\d{4}-\d{2}-\d{2}/).test(strDate)) {
            throw new Error(
                "A string de data deve estar no formato YYYY-MM-DD"
            );
        }
        let dateArray = strDate.split("-");
        let dateObj = new Date(dateArray);
        return dateObj;
    }

    static dateToStr(dateObj) {
        return new Intl.DateTimeFormat("pt-BR").format(dateObj);
    }
}
