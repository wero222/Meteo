export class PrevisioniManager {

    constructor(api_key) {
        this.api_key = api_key;
    }

    getNazioni() {
        let url = "https://raw.githubusercontent.com/pmontrasio/codici-stati/master/dist/countries.json";

        return fetch(url)
            .then(res => res.json());
    }

    getPrevisioni(citta, nazione) {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${citta}&appid=${this.api_key}&units=metric&lang=it`;

        if (nazione != "") {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${citta},${nazione}&appid=${this.api_key}&units=metric&lang=it`
        }

        return fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    if (res.status == 400) // Bad Request
                    {
                        throw new Error("Specificare tutti i dati");
                    }
                    if (res.status == 404) // NotFound
                    {
                        throw new Error("Nessuna corrispondenza trovata");
                    }
                }
            });
    }
}