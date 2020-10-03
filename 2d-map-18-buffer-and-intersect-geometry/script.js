require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/Graphic",
    "esri/geometry/geometryEngine"
  ], function(Map, MapView, FeatureLayer, Graphic, geometryEngine) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
    });


    var featureLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0"
    });

    map.add(featureLayer);

    var activeGraphic;
    var bufferGraphic;

    function findNearestGraphic(event) {
        return view.hitTest(event).then(function(response){
            var graphic, filteredResult;
            //get graphic trail only
            if (response.results.length) {
                filteredResult = response.results.filter(function (result){
                    return (result.graphic.layer === featureLayer);
                })[0];
            }
            // Only return new graphics are found
            if (filteredResult) {
                graphic = filteredResult.graphic;
                if (!activeGraphic || (activeGraphic.attributes.OBJECTID !== graphic.attributes.OBJECTID)){
                    return graphic;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        });
    }

  

    function drawBuffer(bufferGeometry) {
        view.graphics.remove(bufferGraphics);
        bufferGraphic = new Graphic({
            geometry: bufferGeometry,
            symbol: {
                type: "simple-fill",
                color: "rgba(0,0,0,0)",
                outline: {
                    color: "rgba(0,0,0,.5)",
                    width: 1
                }
            }
        });
        view.graphics.add(bufferGraphic);
    }

    view.on("pointer-move", function(event) {
        findNearestGraphic(event).then(function(graphic){
            if (graphic) {
                activeGraphic = graphic;
                var buffer = geometryEngine.geodesicBuffer(activeGraphic.geometry, .25, "miles");
                drawBuffer(buffer);
            }
        });
    });

  });