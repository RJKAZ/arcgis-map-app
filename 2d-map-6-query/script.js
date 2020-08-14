// in this tutoril we will be enabling the app to perform both client side or serverside SQL and spatial queries to access data.
// SQL = Structured Query language. SQL is used to communicate with a database.

// A Server side query is to request a subset of data from the server without adding the feature layer to the map. 
// A Client size query is to access a subset of data on the clinet, you have to add the feature layer to the map first and then use the queryFeature method on a FeatureLayerView object. Since the data is on the client, client side executes very fast 

// Both client-side and server-side queries can contaion a SQL expression and or/ a spatial relationship operator. The main differenc between Clinet and Server side is that clinet side is only possible after the feature layer is added to the map and its attrbutes are present. 

// in this exercise I will execute server and client side queries to find trailheads that are within a distance of 1500 meters from the center of the map and where you click

// so first we need to create a feature layer for the trailheads so we can execute the queries, and a graphics layer to draw the features returned. 

//so for the require statement we need to add the references for the FeatureLayer, GraphicLayer, and Graphic modules 

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicLayer",
    "esri/Graphic"
  ], function(Map, MapView, FeatureLayer, GraphicsLayer, Graphic) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700],
      zoom: 13
    });

    // we create a featurelayer and set the url to access and query the trailheads feature layer, and then create a graphics layer and it to the map.The graphics layer will be used to draw the features returned from the query 

    //reference the feature layer to query 
    var featureLayer = new FeatureLayer ({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    });

    // layer used to draw the graphics returned
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // now we create a function to add the graphics. The function will be caled addGraphics and will be used later to accept the return values froma  query and add the results to the graphic layer.
    //  We clear the graphic layer each time with remove all, set the graphic symbol color and outline width properties to create a black symbol with a cyan outline.
    // then add a simple popupTemplate to each graphic to show some trail information when they are clicked. 

    function addGraphics(result) {
        graphicsLayer.removeALL();
        result.features.forEach(function(feature){
            var g = new Graphic({
                geometry: feature.geometry,
                attributes: feature.attributes,
                symbol: {
                    type: "simple-marker",
                    color: [0,0,0],
                    outline: {
                        width: 2,
                        color: [0, 255, 255],
                    },
                    size: "20px"
                },
                popupTemplate: {
                    title: "{TRL_NAME}",
                    content: "This a {PARK_NAME} trail located in {CITY_JUR}."
                }
            });
            graphicsLayer.add(g);
        });
    }
    
    // left off on 6 - executing server side queries and add graphics. 

  });