// The map is loaded by using an AMD require Statement. (AMD = Asynchronous Module Definition)
// RequireJS is a javascript file and module loader intended for in-browser use. 

require([
    "esri/Map",
    "esri/views/SceneView"
  ], function(Map, SceneView) {

// so we are creating a new map and setting its basemap property to topo-vector (topographical I think)
//since this is for a 3D map, we need to set the ground property to world-elevation (this shows the elevation)
  var map = new Map({
    basemap: "topo-vector",
    ground: "world-elevation"  // show elevation
  });
// Now for 3D we have to create a scene view, and we set its container property to the viewDiv. Now we then set its position to x, y, & z, and the tilt to 65 degrees. 
  var view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
      position: {  // observation point
        x: -118.80800,
        y: 33.96100,
        z: 25000 // altitude in meters
      },
      tilt: 65  // perspective in degrees
    }
  });
});