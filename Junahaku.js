var asemapyynto; //pyyntö asemahaulle
var asemat; //lista asemista -> saadaan lyhenteet junahakuun
var lasema; //käyttäjän antama lähtöasema
var perilla; //käyttäjän antama määränpää
var junapyynto; //pyyntö junille kun asemat tiedossa
var junat; // lista junista annetuilla asemilla

 document.addEventListener("DOMContentLoaded", init);
 function init() {
     hae();
 }
//Haetaan asemat, joista käyttäjä saa valita lähtö- ja pääteaseman (lyhenne ja koko nimi)
     function hae() {
         asemapyynto = new XMLHttpRequest();
         asemapyynto.onreadystatechange = tilanmuutos;
         asemapyynto.open("GET", "https://rata.digitraffic.fi/api/v1/metadata/stations");
         asemapyynto.send();
         console.log("Pyyntö lähetetty");
     }
     //kerätään asemat listalle
     function tilanmuutos() {
         console.dir(asemapyynto);
         if (asemapyynto.readyState === 4) {
             console.log(asemapyynto.responseText);
             asemat = JSON.parse(asemapyynto.responseText)
             tulosta(asemat);
         }
     }

     //Kaikkien asemien lyhenne ja koko nimi annetaan käyttäjälle listana kun hän syöttää lähtö- ja määränpääasemia
    //Lyhenne tarvitaan seuraavaan vaiheeseen kun etsitään junat annetulla välillä
     function tulosta(asemat) {
         var asemalista = document.getElementById("asemat")
         for (var i = 0; i < asemat.length; i++) {
             var kaupunki = asemat[i];
             console.dir(kaupunki);
             asemalista.innerHTML += "<option value= " + kaupunki.stationShortCode + ">" + kaupunki.stationName + "</option>"
         }
     }
//Käyttäjän antamat asemat otetaan talteen ja käytetään seuraavaan hakuun, jossa haetaan junat annettujen asemien välillä
     function naytaValitut() {
         lasema = document.getElementById("lahtoasema").value;
         localStorage.lahtoasema = lasema; //tällä ei tehdä mitään
         perilla = document.getElementById("maaranpaa").value;
         localStorage.perilla = perilla; //tällä ei tehdä mitään
         document.getElementById("tulos").innerHTML="Junat välillä " + lasema + " - " + perilla + ":";
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
                 junat = JSON.parse(junapyynto.responseText);
                 if (junat.length > 0){
                     tulostajunat(junat);
                 }else{
                     document.getElementById("tulos").innerHTML="Annettujen asemien välillä ei kulje suoraa junayhteyttä."
                 }

             }
         }
        function tulostajunat(junat) {
            var junataulukko=document.getElementById("junataulukko")
            junataulukko.innerHTML="<tr>" + "<th>" + "Junatyyppi" + "<th>" + "Junan numero" + "<th>"+ "Lähtöpäivä" +"<th>" + "Lähtöaika" + "<th>" + "Saapumispäivä" + "<th>" + "Saapumisaika" + "</tr>";
            for (var i=0; i< 5; i++){
                var juna = junat[i];
                console.dir(juna);
                var junatyyppi;
                if (juna.trainCategory==="Commuter"){
                    junatyyppi= "Lähijuna " + juna.commuterLineID;
                }else if (juna.trainCategory==="Long-distance"){
                    junatyyppi="Kaukojuna";
                }else {
                    junatyyppi=juna.trainCategory;
                }
 //new Date oliolla tehdään datasta saadusta ajasta(CET) Suomen aikaa saapumisaika
             junataulukko.innerHTML+="<tr>" + "<td>" + junatyyppi + "<td>" + juna.trainType + juna.trainNumber + "<td>" + new Date(etsiLahtoAika(juna.timeTableRows, lasema) ).toLocaleDateString('FI') +"<td>" + new Date(etsiLahtoAika(juna.timeTableRows, lasema) ).toLocaleTimeString('FI').slice(0, -3)
                 + "<td>" + new Date(etsiSaapumisAika(juna.timeTableRows, perilla)).toLocaleDateString('FI')+"<td>" + new Date(etsiSaapumisAika(juna.timeTableRows, perilla)).toLocaleTimeString('FI').slice(0, -3)+"</tr>";
    }



         /*function tulostajunat(junat) {
             var junalista = document.getElementById("junalista")

             for (var i = 0; i < junat.length; i++) {
                 var juna = junat[i];
                 console.dir(juna);

                 var junatyyppi;
                 if (juna.trainCategory==="Commuter"){
                     junatyyppi= "Lähijuna " + juna.commuterLineID;
                 }else if (juna.trainCategory==="Long-distance"){
                     junatyyppi="Kaukojuna";
                 }else {
                     junatyyppi=juna.trainCategory;
                 }
                 junalista.innerHTML += "<li>" + junatyyppi + ": " + juna.trainType + juna.trainNumber + " lähtee " + etsiLahtoAika(juna.timeTableRows, lasema)
                     + " ja on perillä " + etsiSaapumisAika(juna.timeTableRows, perilla)+"</li>"

             }*/
         }
         //haetaan junalistan aikatauluriveiltä rivi, jossa junan lähtöaika annetulta lähtöasemalta
         function etsiLahtoAika(timetablerows, asema) {
            var tr;
            tr=timetablerows.find(function (row){
                return row.stationShortCode===asema && row.type==="DEPARTURE"; //palauttaa rivin, jossa annettu asemalyhenne ja lähtöaika ko asemalta
            })
             console.dir(tr);
            return tr.scheduledTime;
         }

         //haetaan junalistan aikatauluriveiltä rivi, jossa junan saapumisaika annetulle määränpääasemalle
        function etsiSaapumisAika(timetablerows, asema) {
            var tr;
            tr=timetablerows.find(function(row){
                return row.stationShortCode===asema && row.type==="ARRIVAL"; //palauttaa rivin, jossa annettu asemalyhenne ja saapumisaika ko asemalle
            })
            console.dir(tr);
            return tr.scheduledTime

        }

function haeKaikkiJunat() {
    junapyynto = new XMLHttpRequest();
    junapyynto.onreadystatechange = lyhytJunatilanmuutos;
    junapyynto.open("GET", "https://rata.digitraffic.fi/api/v1/live-trains/station/" + lasema + "/" + perilla + "/");
    junapyynto.send();
    console.log("Pyyntö lähetetty");
}

function lyhytJunatilanmuutos() {
    console.dir(junapyynto);
    if (junapyynto.readyState === 4) {
        console.log(junapyynto.responseText);
        //document.getElementById("jotain").innerText=asemapyynto.responseText;
        junat = JSON.parse(junapyynto.responseText);
            tulostakaikkijunat(junat);


    }
}
function tulostakaikkijunat(junat) {
    var junataulukko = document.getElementById("kokojunataulukko")
    junataulukko.innerHTML = "<tr>" + "<th>" + "Junatyyppi" + "<th>" + "Junan numero" + "<th>" + "Lähtöpäivä" + "<th>" + "Lähtöaika" + "<th>" + "Saapumispäivä" + "<th>" + "Saapumisaika" + "</tr>";
    for (var i = 5; i < junat.length; i++) {
        var juna = junat[i];
        console.dir(juna);
        var junatyyppi;
        if (juna.trainCategory === "Commuter") {
            junatyyppi = "Lähijuna " + juna.commuterLineID;
        } else if (juna.trainCategory === "Long-distance") {
            junatyyppi = "Kaukojuna";
        } else {
            junatyyppi = juna.trainCategory;
        }
        //new Date oliolla tehdään datasta saadusta ajasta(CET) Suomen aikaa saapumisaika
        junataulukko.innerHTML += "<tr>" + "<td>" + junatyyppi + "<td>" + juna.trainType + juna.trainNumber + "<td>" + new Date(etsiLahtoAika(juna.timeTableRows, lasema)).toLocaleDateString('FI') + "<td>" + new Date(etsiLahtoAika(juna.timeTableRows, lasema)).toLocaleTimeString('FI').slice(0, -3)
            + "<td>" + new Date(etsiSaapumisAika(juna.timeTableRows, perilla)).toLocaleDateString('FI') + "<td>" + new Date(etsiSaapumisAika(juna.timeTableRows, perilla)).toLocaleTimeString('FI').slice(0, -3) + "</tr>";
    }


//haetaan junalistan aikatauluriveiltä rivi, jossa junan lähtöaika annetulta lähtöasemalta
    function etsiLahtoAika(timetablerows, asema) {
        var tr;
        tr = timetablerows.find(function (row) {
            return row.stationShortCode === asema && row.type === "DEPARTURE"; //palauttaa rivin, jossa annettu asemalyhenne ja lähtöaika ko asemalta
        });
        console.dir(tr);
        return tr.scheduledTime;
    }

//haetaan junalistan aikatauluriveiltä rivi, jossa junan saapumisaika annetulle määränpääasemalle
    function etsiSaapumisAika(timetablerows, asema) {
        var tr;
        tr = timetablerows.find(function (row) {
            return row.stationShortCode === asema && row.type === "ARRIVAL"; //palauttaa rivin, jossa annettu asemalyhenne ja saapumisaika ko asemalle
        });
        console.dir(tr);
        return tr.scheduledTime

    }
}

