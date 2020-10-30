require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Editor"
  ], function(Map, MapView, FeatureLayer, Editor) {

    var myPointsFeatureLayer = new FeatureLayer({
      url: "https://services6.arcgis.com/3qeuJsi4rWiBFYEt/arcgis/rest/services/my_points/FeatureServer"
    })

    

    var map = new Map({
      basemap: "topo-vector",
      layers: [myPointsFeatureLayer]
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
    });

    
    var editorWidget = new Editor({
      view: view
    })

    view.ui.add(editorWidget, "top-right");
  });

