require([
  "esri/WebScene", 
  "esri/views/SceneView"
], function(WebScene, SceneView) {

var webscene = new WebScene({
  portalItem: {
    id: "579f97b2f3b94d4a8e48a5f140a6639b"
  }
});

var view = new SceneView({
  container: "viewDiv",
  map: webscene
  
  
});

});