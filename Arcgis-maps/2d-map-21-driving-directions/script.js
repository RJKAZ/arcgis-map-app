require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Directions"
  ], function(Map, MapView, Directions) {

    var map = new Map({
      basemap: "streets-navigation-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.24532, 34.05398], // longitude, latitude
    zoom: 12
    });

    

    var directions = new Directions({
        view: view
    });

    view.ui.add(directions, "top-right");

  });