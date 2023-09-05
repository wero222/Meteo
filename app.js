import { PrevisioniManager } from "./previsioni.js";

let previsioniManager = new PrevisioniManager("a294b419d929993414e4627a289b1b48");

window.onload = () => {
    previsioniManager.getNazioni()
        .then(nazioni => generaSelectNazioni(nazioni))
        .catch(err => console.log(err));
}

function generaSelectNazioni(nazioni) {
    let selectNazione = document.getElementById("nazione");
    for (const key in nazioni) {
        if (key != "") {
            let n = nazioni[key];
            selectNazione.innerHTML += `<option value="${n.iso3361_2_characters}">${n.italian_country_name_1 != undefined ? n.italian_country_name_1 : n.english_country_name}</option>`;
        }
    }
}

function cercaPrevisioni() {
    let inputCitta = document.getElementById("citta");
    let selectNazione = document.getElementById("nazione");

    previsioniManager.getPrevisioni(inputCitta.value.trim(), selectNazione.value)
        .then(p => {
            generaHTMLPrevisioni(p);
        })
        .catch(err => {
            document.getElementById("msg").innerHTML = err.message;
        });
}
window.cercaPrevisioni = cercaPrevisioni;

function generaHTMLPrevisioni(previsione) {
    let strHTML = "";

    strHTML += `
        <tr>
            <td>Tempo</td>
            <td>${previsione.weather[0].description}</td>
        </tr>
        <tr>
            <td>Vento</td>
            <td>${previsione.wind.speed}</td>
        </tr>
        <tr>
            <td>Pressione</td>
            <td>${previsione.main.pressure}</td>
        </tr>
        <tr>
            <td>Temperatura</td>
            <td>${previsione.main.temp}</td>
        </tr>
        <tr>
            <td>Umidità</td>
            <td>${previsione.main.humidity}</td>
        </tr>
    `;

    document.getElementById("risultato").innerHTML = strHTML;
}