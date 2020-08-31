require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/Layer"
  ], function(Map, MapView, Layer) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
    });

    
    // at the end of the code in the main function, define a function that will be used to add layers to the map. The function will wati for the portalitem to be loaded and then will add the layer to map in the specified index position 
function addLayer(layerItemPromise, index) {
    return layerItemPromise.then(function(layer) {
        map.add(layer, index);
    });
}

// use the static member layer and the fromPortalItem method to access the trailheads(point) layer
// Set the id property to "the long pasted number below"
// use the add layer function to add the layer to the map.
var trailheadsPortalItem = Layer.fromPortalItem({
    portalItem: {
        id: "33fc2fa407ab40f9add12fe38d5801f5"
    }
});

//trails
var trailsPortalItem = Layer.fromPortalItem({
    portalItem: {
        id: "52a162056a2d48409fc3b3cbb672e7da"
    }
});

// parks
var parksPortalItem = Layer.fromPortalItem({
    portalItem: {
        id: "83cf97eea04e4a699689c250dd07b975"
    }
});

addLayer(trailheadsPortalItem, 2)
.then(addLayer(trailsPortalItem, 1))
.then(addLayer(parksPortalItem, 0));

  });