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
    var lineGraphic; 
    var textGraphic;

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
        view.graphics.remove(bufferGraphic);
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

    function drawLine(point, point2){
        view.graphics.remove(lineGraphic);
        lineGraphic = new Graphic({
            geometry: {
                type: "polyline",
                paths: [
                    [point.longitude, point.latitude],
                    [point2.longitude, point2.latitude]
                ]
            },
            symbol: {
                type: "simple-line",
                color: "#333",
                width: 1
            }
        });
        view.graphics.add(lineGraphic);
    }

    function drawText(point, distance){
        view.graphics.remove(textGraphic);
        textGraphic = new Graphic({
            geometry: point,
            symbol: {
                type: "text",
                text: distance.toFixed(2) + " miles",
                color: "black",
                font: {
                    size: 12
                },
                haloColor: "white",
                haloSize: 1
            }
        })
        view.graphics.add(textGraphic)
    }

 
    

    view.on("pointer-move", function(event) {
        findNearestGraphic(event).then(function(graphic){
            if (graphic) {
                activeGraphic = graphic;
                var buffer = geometryEngine.geodesicBuffer(activeGraphic.geometry, .25, "miles");
                drawBuffer(buffer);
            }
        });

        if (bufferGraphic) {
            var cursorPoint = view.toMap(event);
            var intersects = geometryEngine.intersects(bufferGraphic.geometry, cursorPoint);
            var symbol = bufferGraphic.symbol.clone();
            if (intersects) {
                symbol.color = "rgba(0,0,0,.15)"; // highlight
            } else {
                symbol.color = "rgba(0,0,0,0)"; //transparent
            }
            bufferGraphic.symbol = symbol;
            var vertexResult = geometryEngine.nearestVertex(bufferGraphic.geometry, cursorPoint);
            var closestPoint = vertexResult.coordinate;
            drawLine(cursorPoint, closestPoint)
            var distance = geometryEngine.geodesicLength(lineGraphic.geometry, "miles");
            drawText(cursorPoint, distance);
        }
    });

  });