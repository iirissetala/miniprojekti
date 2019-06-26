// document.addEventListener("DOMContentLoaded", init);
// function init() {
//     haeKartta();
//     asemoiKartta();
// }
// var karttapyynto;
// var OpenLayers;
//
// //haetaan kartta OpenStreetMapista
// function haeKartta() {
//     karttapyynto = new XMLHttpRequest();
//     karttapyynto.onreadystatechange = karttatilanmuutos;
//     karttapyynto.open("GET", "http://www.openlayers.org/api/OpenLayers.js");
//     console.log("Pyyntö lähetetty");
// }
// function karttatilanmuutos() {
//     console.dir(karttapyynto);
//     if (karttapyynto.readyState === 4) {
//         console.log(karttapyynto.responseText);
//     }
// }
// function asemoiKartta(){
//     map = new OpenLayers.Map(document.getElementById(("mapdiv")));
//     map.addLayer(new OpenLayers.Layer.OSM());
//
//     var lonLat = new OpenLayers.LonLat( 24.8302072, 60.1772711)
//         .transform(
//             new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
//             map.getProjectionObject() // to Spherical Mercator Projection
//         );
//
//     var zoom=16;
//
//     var markers = new OpenLayers.Layer.Markers( "Markers" );
//     map.addLayer(markers);
//
//     markers.addMarker(new OpenLayers.Marker(lonLat));
//
//     map.setCenter (lonLat, zoom);
// }
//
// // map = document.getElementById("mapdiv");
