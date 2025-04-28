let wyzwania = []; //tablica z wyzwaniami
let dostepnewyzwania = []; // kopiowanie wyzwań
let aktualnewyzwanie = ""; // przechowuje aktualne wyzwanie

async function pobierzWyzwania() { //pobiera wyzwania z pliku SQL
    try{
        const odp = await fetch('wyzwania.sql'); //pobiera plik SQL
        if (!odp.ok) {
            throw new Error('Błąd wczytywania wyzwań: ' + response.statusText); //wyświetla błąd jeżeli baza nie załowowała się poprawnie
        }
        const data = await response.json(); 
        wyzwania = data.wyzwania; //przypisuje do tablicy wyzwania
    }
    catch (error) {
        console.error('Wystąpił błąd:', error); //jeżeli wystąpił błąd to go wyświetla
    }
}

function zapiszStan(){
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

function sprawdz(){ //funkcja sprawdzająca czy jest po północy
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
    if (dostepnewyzwania.length === 0){
        document.getElementById("wynik").innerHTML = "Gratulację udało ci się wykonać wszystkie wyzwania🎉🎉";
        document.getElementById("przycisk").style.display = "none";
        document.getElementById("przycisk2").style.display = "none";
        document.getElementById("przycisk3").style.display = "inline";
        return;
    }

    let losowa = Math.floor(Math.random() * dostepnewyzwania.length); //losuje wyzwanie
    aktualnewyzwanie = dostepnewyzwania.splice(losowa, 1)[0]; // usuwa i zwraca 1 losowe wyzwanie

    zapiszStan();

    document.getElementById("wynik").innerHTML = aktualnewyzwanie;
    document.getElementById("przycisk").style.display = "none";
    document.getElementById("przycisk2").style.display = "inline";
}

function ukonczone() { 
    document.getElementById("wynik").innerHTML = "Gratulacje, ukończyłeś wyzwanie🎉🎉";
    document.getElementById("przycisk2").style.display = "none";
    document.getElementById("przycisk3").style.display = "inline";

    let historia = JSON.parse(localStorage.getItem("historia")) || [];
    if (aktualnewyzwanie) {
        historia.push(aktualnewyzwanie);
        localStorage.setItem("historia", JSON.stringify(historia)); //zapisuje do historii wykonane zadanie
    }

    // Pokaż animację po ukończeniu wyzwania
    document.getElementById("animacja").style.display = "block"; 
}

function reset() { //resetuje aby wylosować kolejne wyzwanie
    document.getElementById("wynik").innerHTML = "";
    document.getElementById("przycisk").style.display = "inline";
    document.getElementById("przycisk2").style.display = "none";
    document.getElementById("przycisk3").style.display = "none";
    document.getElementById("historia").innerHTML = "";
    document.getElementById("animacja").style.display = "none"; 
    localStorage.setItem('reset', new Date().toDateString());
}

function pokazhistorie() { //pokazuje historię wykonanych wyzwań dzisiaj
    let historia = JSON.parse(localStorage.getItem("historia")) || [];
    let tekst = historia.length ? historia.join("✅<br>") : "Brak ukończonych wyzwań.";
    document.getElementById("historia").innerHTML = tekst;
}

window.onload = () => { 
    sprawdz(); //sprawdza date
    reset(); //czyści ekran z poprzedniego tekstu
}; 
