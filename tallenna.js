var haettuMista;
var haettuMihin;

function luoMista() {
    haettuMista =(document.getElementById("mista").value);
    console.log("Luo: "+haettuMista)
}
function tallenna() {
    var haku=JSON.stringify(haettuMista);
    console.log("Tallenna: " +haku);
    localStorage.tallennettuKaupunki=haku;
}
function lueHistoria() {
    haku= localStorage.getItem()
        JSON.parse(localStorage.tallennettuKaupunki)
    console.dir(haku);

}
