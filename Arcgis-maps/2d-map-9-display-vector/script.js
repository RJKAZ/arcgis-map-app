/*require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/layers/VectorTileLayer"
], function (Map, MapView, Basemap, VectorTileLayer) {

    var basemap = new Basemap({
        baseLayers: [
            new VectorTileLayer({
                portalItem: {
                    id: "d2ff12395aeb45998c1b154e25d680e5" // Forest and Parks Canvas
                }
            })
        ]
    });

    var map = new Map({
        // basemap: "topo-vector",
        basemap: basemap
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-100, 40],
        zoom: 3
    });

});
*/
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemap",
    "esri/layers/VectorTileLayer",
    "esri/layers/TileLayer"

], function (Map, MapView, Basemap, VectorTileLayer, TileLayer) {
    // in the begining of the function, we will create a new Basemap and add a vector tile layer as a baselayer to the basemap

    var basemap = new Basemap({
        baseLayers: [

            new TileLayer({
                portalItem: {
                    id:"1b243539f4514b6ba35e7d995890db1d"
                }
            }),
            new VectorTileLayer({
                portalItem: {
                    id: "d2ff12395aeb45998c1b154e25d680e5" // forest and parks canvas
                },
                opacity: 0.5
            })
        ]
    });

    var map = new Map({
        basemap: basemap
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-100, 40], // longitude, latitude
        zoom: 3
    });

    

});



/* require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Basemaps",
    "esri/layers/VectorTileLayer"

  ], function(Map, MapView, Basemap, VectorTileLayer) {
// in the begining of the function, we will create a new Basemap and add a vector tile layer as a baselayer to the basemap

var basemap = new Basemap({
    baseLayers: [
        new VectorTileLayer({
            portalItem: {
                id: "d2ff12395aeb45998c1b154e25d680e5" // forest and parks canvas
            }
        })
    ]
});

    var map = new Map({
      basemap: basemap
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 3
    });

    view.ui.add(locate, "top-left");

  });
  */