var pyynto;
var junat;
document.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("nappi").addEventListener("click", hae);
}
function hae() {
    pyynto = new XMLHttpRequest();
    pyynto.onreadystatechange=tilanmuutos;
    pyynto.open("GET", "https://rata.digitraffic.fi/api/v1/live-trains/");
    pyynto.send();
    console.log("Pyyntö lähetetty");
}
function tilanmuutos() {
    console.dir(pyynto);
    if (pyynto.readyState===4){
        console.log(pyynto.responseText);
        //document.getElementById("jotain").innerText=asemapyynto.responseText;
        junat = JSON.parse(pyynto.responseText)
        tulosta(junat);
    }
}
function tulosta(junat) {
    var junalista=document.getElementById("junalista")
    for (var i=0; i<junat.length; i++){
        var juna = junat[i];
        console.dir(juna);
        junalista.innerHTML+="<li>" + juna.trainCategory + ": " +  juna.trainType + juna.trainNumber +
            ", lähtee Helsingistä raiteelta " + juna.timeTableRows[0].commercialTrack + " klo "
            + juna.timeTableRows[0].scheduledTime.substring(11, 16) + " ja saapuu Lahteen klo "
            + juna.timeTableRows[47].scheduledTime.substring(11, 16) +"</li>"
    }

}

function check(form)/*function to check userid & password*/
{
    /*the following code checks whether the entered userid and password are matching*/
    if(form.userid.value == "maja" && form.pswrd.value == "malli" || form.userid.value == "vieras" && form.pswrd.value == "vieras" ||form.userid.value == "europe" && form.pswrd.value == "parasbändiikinä")
    {
        localStorage.kirjautunutKayttaja=form.userid.value;
        window.open(href="login.html")/*opens the target page while Id & password matches*/

    }
    else
    {
        alert("Väärä salasana tai käyttäjänimi! \nKokeile esim. vieras/vieras")/*displays error message*/
    }
}
var asemapyynto; //pyyntö asemahaulle
var asemat; //lista asemista -> saadaan lyhenteet junahakuun
var lasema; //käyttäjän antama lähtöasema
var perilla; //käyttäjän antama määränpää
var junapyynto; //pyyntö junille kun asemat tiedossa
var junat; // lista junista annetuilla asemilla
var haetutjunat= []; //tallenetaan haettuja lähtöjä määränpää


// junahaku
document.addEventListener("DOMContentLoaded", init);
function init() {
    // document.getElementById("nappi").addEventListener("click", hae);
    hae();
}

function hae() {
    asemapyynto = new XMLHttpRequest();
    asemapyynto.onreadystatechange = tilanmuutos;
    asemapyynto.open("GET", "https://rata.digitraffic.fi/api/v1/metadata/stations");
    asemapyynto.send();
    console.log("Pyyntö lähetetty");
}

function tilanmuutos() {
    console.dir(asemapyynto);
    if (asemapyynto.readyState === 4) {
        console.log(asemapyynto.responseText);
        //document.getElementById("jotain").innerText=asemapyynto.responseText;
        asemat = JSON.parse(asemapyynto.responseText)
        tulosta(asemat);
    }
}

function tulosta(asemat) {
    var asemalista = document.getElementById("asemat")
    for (var i = 0; i < asemat.length; i++) {
        var kaupunki = asemat[i];
        console.dir(kaupunki);
        asemalista.innerHTML += "<option value= " + kaupunki.stationShortCode + ">" + kaupunki.stationName + "</option>"
    }

}

function naytaValitut() {
    lasema = document.getElementById("lahtoasema").value;
    localStorage.lahtoasema = lasema;
    document.getElementById("tulos").innerHTML = "Lähtöasema oli " + lasema;
    perilla = document.getElementById("maaranpaa").value;
    localStorage.perilla = perilla;
    document.getElementById("toinenkaupunki").innerHTML = "Määränpää on " + perilla;
    haejunat();
}



function haejunat() {
    junapyynto = new XMLHttpRequest();
    junapyynto.onreadystatechange = junatilanmuutos;
    junapyynto.open("GET", "https://rata.digitraffic.fi/api/v1/live-trains/station/" + lasema + "/" + perilla + "/");
    junapyynto.send();
    console.log("Pyyntö lähetetty");
}

function junatilanmuutos() {
    console.dir(junapyynto);
    if (junapyynto.readyState === 4) {
        console.log(junapyynto.responseText);
        //document.getElementById("jotain").innerText=asemapyynto.responseText;
        junat = JSON.parse(junapyynto.responseText)
        tulostajunat(junat);
    }
}

function tulostajunat(junat) {
    var junalista = document.getElementById("junalista")
    for (var i = 0; i < junat.length; i++) {
        var juna = junat[i];
        console.dir(juna);
        junalista.innerHTML += "<li>" + juna.trainCategory + ": " + juna.trainType + juna.trainNumber + "</li>"
    }

}
const lisaaHaettu = (ev)=>{ //haetut junat arraylistana
    ev.preventDefault();
    var juna = {
        id: Date.now(),
        lahto: document.getElementById("lahtoasema").value,
        maaranpaa: document.getElementById("maaranpaa").value
    }
    haetutjunat.push(juna);
    document.forms[0].reset();
    localStorage.setItem('Kayttajanhakemat', JSON.stringify(haetutjunat));
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('pnk').addEventListener('click', lisaaHaettu)
});



