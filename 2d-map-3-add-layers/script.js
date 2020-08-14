// The map is loaded by using an AMD require Statement. (AMD = Asynchronous Module Definition)
// RequireJS is a javascript file and module loader intended for in-browser use. 

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"

    ], function (Map, MapView, FeatureLayer) {
    // so we are creating a new map and setting its basemap property to topo-vector (topographical I think)
    var map = new Map({
        basemap: "topo-vector"
    });
    // now we are creating a mapview and setting its container property to viewDiv, the center property we set the longitude latudide cordinates and the default zoom setting.
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543,34.02700 ], //longitude, Latitude
            zoom: 13
    });

    var trailheadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    map.add(trailheadsLayer);

    // Trailheads feature layer (points)
    var trailheadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    map.add(trailheadsLayer, 0);

    // Parks and open spaces (polygons)

    var parksLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });

    map.add(parksLayer, 0);
    
    
});