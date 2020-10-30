require([
  "esri/Map", 
  "esri/views/SceneView",
  "esri/layers/FeatureLayer"
], function(Map, SceneView, FeatureLayer) {

var map = new Map({
  basemap: "topo-vector",
  ground: "world-elevation"
});

var view = new SceneView({
  container: "viewDiv",
  map: map,
  camera: {
    position: {
      x: -118.808,
      y: 33.961,
      z: 2000 // meters
    },
    tilt: 75
  }
});

var featureLayer = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
});

map.add(featureLayer);

var trailsLayer = FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
});

map.add(trailsLayer, 0);

var parksLayer = new FeatureLayer({
  url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
})

map.add(parksLayer, 0);

});