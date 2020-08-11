// The map is loaded by using an AMD require Statement. (AMD = Asynchronous Module Definition)
// RequireJS is a javascript file and module loader intended for in-browser use. 

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery"

    ], function (Map, MapView, BasemapToggle, BasemapGallery) {
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
    
   //  creating a variable for the basemap toggle. The toggle is to add the satellite map.
     var basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "satellite"
     });

    view.ui.add(basemapToggle, "bottom-right");

    var basemapGallery = new BasemapGallery({
        view: view,
        source: {
            portal: {
                url: "https://www.arcgis.com",
                useVectorBasemaps: true // load vector tile basemaps.
            }
        }
    });

    // this bit of javascript is what adds the gallery toggle, or rather makes it viewable on the bottom right of the page.
    
    view.ui.add(basemapGallery, "top-right");
});