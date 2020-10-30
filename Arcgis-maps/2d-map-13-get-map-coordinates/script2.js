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
      center: [-118.80543,34.02700],
      zoom: 13
    });
    
    //*** Add div element to show coordates ***//
    var coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";
    
    view.ui.add(coordsWidget, "bottom-right");

    //*** Update lat, lon, zoom and scale ***//
    function showCoordinates(pt) {
      var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) + 
          " | Scale 1:" + Math.round(view.scale * 1) / 1 +
          " | Zoom " + view.zoom;
      coordsWidget.innerHTML = coords;
    }
    
    //*** Add event and show center coordinates after the view is finished moving e.g. zoom, pan ***//
    view.watch(["stationary"], function() {
      showCoordinates(view.center);
    });

    //*** Add event to show mouse coordinates on click and move ***//
    view.on(["pointer-down","pointer-move"], function(evt) {
      showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
    });
    

    
  });