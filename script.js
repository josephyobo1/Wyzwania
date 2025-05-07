let wyzwania = [
    "Zrób dziesięć pompek",
    "Spędź godzinę bez telefonu",
    "Zrób dobry uczynek",
    "Przeczytaj rozdział książki",
    "Idź na spacer",
    "Wypij szklankę wody",
    "Zrób 15 przysiadów",
    "Posprzątaj swoje biurko",
    "Napisz coś miłego do znajomego",
    "Zaplanuj swój dzień"
]; //tablica z wyzwaniami
let dostepnewyzwania = []; // kopiowanie wyzwań
let aktualnewyzwanie = ""; // przechowuje aktualne wyzwanie

function zapiszStan() {
    localStorage.setItem("dostepneWyzwania", JSON.stringify(dostepnewyzwania)); //zapisuje jakie wyzwania są dostępne
}

function wczytajStan() { //wczytuje jakie wyzwania są dostępne
    let zapisane = localStorage.getItem("dostepneWyzwania");
    if (zapisane) {
        dostepnewyzwania = JSON.parse(zapisane);
    } else {
        dostepnewyzwania = [...wyzwania];
    }
}

function sprawdz() { //funkcja sprawdzająca czy jest po północy
    let reset = localStorage.getItem('reset');
    let now = new Date();
    let dzisiaj = now.toDateString();

    if (reset !== dzisiaj) {
        localStorage.setItem('reset', dzisiaj);
        dostepnewyzwania = [...wyzwania];
        localStorage.removeItem('historia'); //czyści historię
        zapiszStan();
    } else {
        wczytajStan();
    }
}

function losowanie() {
    sprawdz();
    if (dostepnewyzwania.length === 0) {
        document.getElementById("wynik").innerHTML = "Gratulację udało ci się wykonać wszystkie wyzwania 🎉🎉";
        document.getElementById("stopka").style.position ="fixed";
        document.getElementById("stopka").style.bottom = "0px";
        document.getElementById("przycisk").style.display = "none";
        document.getElementById("przycisk2").style.display = "inline";
        document.getElementById("przycisk3").style.display = "none";
        return;
    }

    let losowa = Math.floor(Math.random() * dostepnewyzwania.length); // Losuje wyzwanie
    aktualnewyzwanie = dostepnewyzwania.splice(losowa, 1)[0]; // Usuwa i zwraca 1 losowe wyzwanie

    zapiszStan();

    document.getElementById("wynik").innerHTML = aktualnewyzwanie;
    document.getElementById("stopka").style.position ="fixed";
    document.getElementById("stopka").style.bottom = "0px";
    document.getElementById("przycisk").style.display = "none";
    document.getElementById("przycisk2").style.display = "inline";
    document.getElementById("przycisk3").style.display = "inline";
    document.getElementById("animacja-lewa").style.display = "none";
    document.getElementById("animacja-prawa").style.display = "none";

    // Ukryj historię
    const historiaElement = document.getElementById("historia");
    if (historiaElement) {
        historiaElement.style.display = "none";
    }

    // Dodaj wyzwanie do historii
    let historia = JSON.parse(localStorage.getItem("historia")) || [];
    historia.push(aktualnewyzwanie);
    localStorage.setItem("historia", JSON.stringify(historia));
}

function ukonczone() {
    document.getElementById("wynik").innerHTML = "Gratulacje, ukończyłeś wyzwanie 🎉🎉";
    document.getElementById("stopka").style.position = "relative";
    document.getElementById("przycisk").style.display = "inline";
    document.getElementById("przycisk2").style.display = "inline";
    document.getElementById("przycisk3").style.display = "none";

    // Pokaż animacje
    document.getElementById("animacja-lewa").style.display = "block";
    document.getElementById("animacja-prawa").style.display = "block";

    let historia = JSON.parse(localStorage.getItem("historia")) || [];
    
    // Sprawdź, czy aktualne wyzwanie już istnieje w historii
    if (aktualnewyzwanie && !historia.includes(aktualnewyzwanie)) {
        historia.push(aktualnewyzwanie);
        localStorage.setItem("historia", JSON.stringify(historia)); // Zapisuje do historii wykonane zadanie
    }
}

function reset() { // resetuje aby wylosować kolejne wyzwanie
    document.getElementById("wynik").innerHTML = "";
    document.getElementById("przycisk").style.display = "inline";
    document.getElementById("przycisk2").style.display = "none";
    document.getElementById("przycisk3").style.display = "none";

    // Ukryj animacje
    document.getElementById("animacja-lewa").style.display = "none";
    document.getElementById("animacja-prawa").style.display = "none";

    const historiaElement = document.getElementById("historia");
    if (historiaElement) {
        historiaElement.style.display = "none"; // Ukryj historię
        historiaElement.innerHTML = "<h2>HISTORIA</h2>"; // Wyczyść zawartość historii
    }

    localStorage.setItem('reset', new Date().toDateString());
}

function pokazhistorie() { // pokazuje lub ukrywa historię wykonanych wyzwań dzisiaj
    const historiaElement = document.getElementById("historia");


    // Jeśli historia jest widoczna, ukryj ją
    if (historiaElement.style.display === "block") {
        historiaElement.style.display = "none";
        return;
    }

    // Pobierz historię z localStorage
    let historia = JSON.parse(localStorage.getItem("historia")) || [];
    let tekst = historia.length
        ? historia.map((item, index) => `${index + 1}. ${item} ✅`).join("<br>")
        : "Brak ukończonych wyzwań.";
        document.getElementById("stopka").style.position ="relative";

    // Wstaw treść do #historia
    historiaElement.innerHTML = `<h2>HISTORIA</h2>${tekst}`;

    // Pokaż sekcję historii
    historiaElement.style.display = "block";
    
}

window.onload = () => {
    sprawdz(); //sprawdza date
    reset(); //czyści ekran z poprzedniego tekstu
};