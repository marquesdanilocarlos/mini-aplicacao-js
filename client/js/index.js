let campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor"),
];

let form = document.querySelector(".form");
let tbody = document.querySelector("table tbody");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let newTr = document.createElement("tr");

    campos.forEach((campo) => {
        let newTd = document.createElement("td");
        newTd.textContent = campo.value;
        newTr.appendChild(newTd);
    });

    let newTdVolume = document.createElement("td");
    newTdVolume.textContent = campos[1].value * campos[2].value;
    newTr.appendChild(newTdVolume);

    tbody.appendChild(newTr);

    form.reset();
});
