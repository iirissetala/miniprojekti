var pyynto;
var junat;
document.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("nappi").addEventListener("click", hae);
}
function hae() {
    pyynto = new XMLHttpRequest();
    pyynto.onreadystatechange=tilanmuutos;
    pyynto.open("GET", "https://rata.digitraffic.fi/api/v1/live-trains/station/");
    pyynto.send();
    console.log("Pyyntö lähetetty");
}
function tilanmuutos() {
    console.dir(pyynto);
    if (pyynto.readyState===4){
        console.log(pyynto.responseText);
        //document.getElementById("jotain").innerText=pyynto.responseText;
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