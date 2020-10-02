require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Track",
    "esri/Graphic",
    "esri/widgets/Compass"
  ], function(Map, MapView, Locate, Track, Graphic, Compass) {

    var map = new Map({
      basemap: "streets-navigation-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-40, 28], // longitude, latitude
    zoom: 2
    });
/*
    var locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
            options.target.scale = 1500; //override the default map scale
            return view.goTo(options.target);
        }
    });
*/

var track = new Track({
    view: view,
    graphic: new Graphic({
        symbol: {
            type: "simple-marker",
            size: "12px",
            color: "green",
            outline: {
                color: "#efefef",
                width: "1.5px"
            }
        }
    }),
    useHeadingEnabled: false //don't change orientation of the map.
})

    view.ui.add(track, "top-left");

var compass = new Compass({
    view: view
});
view.ui.add(compass, "top-left")
  });