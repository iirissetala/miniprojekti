//alla oleva vaihtoehto mahdollistaa ennalta määrätyn lokaation
// var mymap = L.map('mapdiv').setView([60.1772711, 24.8302072], 13);



//asetetaan oletusnäkymä käyttäjän lokaation mukaan
var mymap = L.map('mapdiv').locate({setView: true, maxZoom:18});

//alla oleva koodi hakee ja määrittää käytettävän karttapohjan OpenStreetMapista
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1IjoiYW5zb2xhaSIsImEiOiJjanhkZXY1cGQwNHhsM3RvY240aHh4OGR2In0.1c4hX9PMV-_8we-49YpU6g'
}).addTo(mymap);
//id: 'mapbox.streets'  -> näyttää karttakuvana
//id: 'mapbox.satellite' -> näyttää sateliittikuvana

//kun lokaatio löytyy, ilmoitetaan käyttäjälle
function onLocationFound(e) {
    var radius = e.accuracy;
    L.marker(e.latlng).addTo(mymap)
        .bindPopup("Olet " + radius + "m säteellä <br>tästä pisteestä").openPopup();
    L.circle(e.latlng, radius).addTo(mymap);
}
mymap.on('locationfound', onLocationFound);

//mikäli käyttäjää ei löydetä, annetaan virheilmoitus
function onLocationError(e) {
    alert(e.message);
}
mymap.on('locationerror', onLocationError);


//lisätään sininen karttamerkki osoittamaan annettuihin koordinaatteihin
//  var marker = L.marker([60.1772711, 24.8302072]).addTo(mymap);

//lisätään vihreä rengasmerkki annettuhin koordinaatteihin, Academyn kampus
var circle = L.circle([60.1772737,24.8302072], {
    color: 'green',
    fillColor: '#10C371',
    fillOpacity: 0.5,
    radius: 200
}).addTo(mymap);

//Popup viestin lisääminen haluttuihin koordinaatteihin .openPopup avaa viestin heti
//  marker.bindPopup("<b>Tämä on</b><br>Keilaranta").openPopup();
circle.bindPopup("Academyn kampus");

