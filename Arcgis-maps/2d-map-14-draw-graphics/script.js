require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Sketch"
  ], function(Map, MapView, GraphicsLayer, Sketch) {

    var graphicsLayer = new GraphicsLayer();

    var map = new Map({
      basemap: "topo-vector",
      layers: [graphicsLayer]
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
    });

    var sketch = new Sketch({
        view: view,
        layer: graphicsLayer
    });

    view.ui.add(sketch, "top-right");



  });