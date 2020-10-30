 require([
    "esri/Map",
    "esri/views/MapView"
  ], function(Map, MapView) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
    });

    

    // thru the javascript, we will create a div element and add it to the bottom right corner of the view. 
    // we are also assigning it an id and applying some simple styleing so the UI looks and behaves like other widgets. 
    // All widgets shoyld use the esri-widget and esri-component css classes.

    var coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";

    view.ui.add(coordsWidget, "bottom-right");

    // create  new function to update the inner HTML of the widget and display the current latitude and longitude, scale, and zoom level for the map.
    // This function will take any given point and round the coordinates to a fixed set of decimal places.

    function showCoordinates(pt) {
        var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
        " | Scale 1:" + Math.round(view.scale * 1) / 1 +
        " | Zoom " + view.zoom;
        coordsWidget.innerHTML = coords;
    }

    // now we add event handlers to call the showCoordinates function when the view is stationary and when the pointer moves.
    // when the view is stationary, it will show the center location. When the pointer moves,, it will display the current pointer location.
    // use toMap to convert screen coordinates to map coordinates

    view.watch("stationary", function() {
        showCoordinates(view.center);
    });

    view.on(["pointer-down", "pointer-move"], function(evt) {
      showCoordinates(view.toMap({ x: evt.x, y: evt.y}));
    })

  });

 

  