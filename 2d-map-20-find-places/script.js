require([
  "esri/Map",
  "esri/views/MapView",
  "esri/tasks/Locator",
  "esri/Graphic"
], function(Map, MapView, Locator, Graphic) {

  var map = new Map({
    basemap: "topo-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118.80500, 34.02700], // longitude, latitude
  zoom: 13
  });


  var places = ["Coffee shop", "Gas station", "Food", "Hotels", "Parks and Outdoors"];

  var select = document.createElement("select", "");
  select.setAttribute("class", "esri-widget esri-select");
  select.setAttribute("style", "width: 175px; font-family: Avenir Next W00; font-size: 1em");
  places.forEach(function(p){
    var option = document.createElement("option");
    option.value = p;
    option.innerHTML = p;
    select.appendChild(option);
  });

  view.ui.add(select, "top-right");

  var locator = new Locator({
    url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
 });

 // find places and add them to the map

 function findPlaces(category, pt) {
   locator.addressToLocations({
     location: pt,
     categories: [category],
     maxLocations: 25,
     outFields: ["Place_addr", "PlaceName"]
   })
   .then(function(results){
     view.popup.close();
     view.graphics.removeALL();
     results.forEach(function(result){
       view.graphics.add(
         new Graphic({
           attributes: result.attributes,
           geometry: result.location,
           symbol: {
             type: "simple-marker",
             color: "#000000",
             size: "12px",
             outline: {
               color: "#ffffff",
               width: "2px"
             }
           },
           popupTemplate: {
             title: "{PlaceName}",
             content: "{Place_addr}"
           }
         })
       );
     });

   });
 }

 // seatch for places in center of map when the app loads
view.watch("stationary", function(val){
  if (val){
    findPlaces(select.value, view.center);
  }
});


 //listen for category changes and find places

 select.addEventListener('change', function(event){
   findPlaces(event.target.value, view.center);
 });

 //listen for mouch clicks and find places
 view.on("click", function(event){
   view.hitTest(event.screenPoint)
   .then(function(response){
     if (response.results.length < 2) { //if graphic is not clicked, find places
      findPlaces(select.options[select.selectedIndex].text, event.mapPoint);
    }
   })
 });

  
  


});