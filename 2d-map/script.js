// The map is loaded by using an AMD require Statement. (AMD = Asynchronous Module Definition)
// RequireJS is a javascript file and module loader intended for in-browser use. 

require([
    "esri/Map",
    "esri/views/MapView"

    ], function (Map, MapView) {
    // so we are creating a new map and setting its basemap property to topo-vector (topographical I think)
    var map = new Map({
        basemap: "topo-vector"
    });
    // now we are creating a mapview and setting its container property to viewDiv, the center property we set the longitude latudide cordinates and the default zoom setting.
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-74.0060, 40.7128, ], //longitude, Latitude
        zoom: 13
    });
});