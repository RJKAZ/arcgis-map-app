require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/Graphic"
  ],
  function(
    Map, MapView, FeatureLayer, GraphicsLayer, Graphic
  ) {

    var map = new Map({
      basemap: "topo-vector"
    });
  
    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80543,34.02700],
      zoom: 13
    });
    
    //*** CHALLENGE ***//
    var sql = "TRL_NAME like '%Canyon%'";

    view.when(function(){
      //*** ADD ***//
      // queryFeatureLayer(view.center, 1500, "intersects")
      queryFeatureLayerView(view.center, 1500, "intersects")
      
      //*** CHALLENGE ***//
      //queryFeatureLayer(view.center, 1500, "intersects", sql)
      //queryFeatureLayerView(view.center, 1500, "intersects", sql)
    });

    view.on("click", function(event){
      //*** ADD ***//
      queryFeatureLayer(event.mapPoint, 1500, "intersects")
      //queryFeatureLayerView(event.mapPoint, 1500, "intersects");
      
      //*** CHALLENGE ***//
      // queryFeatureLayer(event.mapPoint, 1500, "intersects", sql)
      queryFeatureLayerView(event.mapPoint, 1500, "intersects", sql)
    });

  
    // Reference the feature layer to query

    var featureLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    });
  
   // Add a graphics layer to hold features and draw data
  
    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
  
    function addGraphics(result) {
      graphicsLayer.removeAll();
      result.features.forEach(function(feature){
        var g = new Graphic({
          geometry: feature.geometry,
          attributes: feature.attributes,
          symbol: {
           type: "simple-marker",
            color: [0,0,0],
            outline: {
             width: 2,
             color: [0,255,255],
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
  
    // Server-side query
  
    function queryFeatureLayer(point, distance, spatialRelationship, sqlExpression) {
      var query = {
        geometry: point,
        distance: distance,
        spatialRelationship: spatialRelationship,
        outFields: ["*"],
        returnGeometry: true,
        where: sqlExpression
      };
      featureLayer.queryFeatures(query).then(function(result) {
        addGraphics(result);
      });
    }  
      
    // Client-side query
  
    function queryFeatureLayerView(point, distance, spatialRelationship, sqlExpression){ 
      if (!map.findLayerById(featureLayer.id)) {
        featureLayer.outFields = ["*"];
        map.add(featureLayer,0);
      }
      var query = {
        geometry: point,
        distance: distance,
        spatialRelationship: spatialRelationship,
        outFields: ["*"],
        returnGeometry: true,
        where: sqlExpression
      };
      // Wait for the layerview to be ready and then query features
      view.whenLayerView(featureLayer).then(function(featureLayerView) {
        if (featureLayerView.updating) {
          var handle = featureLayerView.watch("updating", function(isUpdating){
            if (!isUpdating) {
              featureLayerView.queryFeatures(query).then(function(result) {
                addGraphics(result) 
              });
              handle.remove();
            }
          });            
        } else {
          featureLayerView.queryFeatures(query).then(function(result) {
            addGraphics(result);
          });
        }
      });
    } 
  
    // CHALLENGE: Find a feature and show pop-ups (client-side)
  
    // view.when(function(){
    //   view.whenLayerView(featureLayer).then(function(featureLayerView) {
    //     view.on("pointer-move", function(event){
    //       view.hitTest(event).then(function(response){
    //         // Only return features for the feature layer
    //         var feature = response.results.filter(function (result) {
    //          return result.graphic.layer === featureLayer;
    //         })[0].graphic;
    //         if (feature) {
    //           // Show popup for new features only
    //           if (!view.popup.features.length || view.popup.features.length && (view.popup.features[0].attributes.FID !== feature.attributes.FID)) {
    //             view.popup.open({
    //               title: feature.attributes.TRL_NAME,
    //               content: "This a " + feature.attributes.PARK_NAME + " trail located in " + feature.attributes.CITY_JUR + ".",
    //               location: feature.geometry
    //             });
    //           }
    //         }
    //       });
    //     });
    //   });        
    // });

  });


// in this tutoril we will be enabling the app to perform both client side or serverside SQL and spatial queries to access data.
// SQL = Structured Query language. SQL is used to communicate with a database.

// A Server side query is to request a subset of data from the server without adding the feature layer to the map. 
// A Client size query is to access a subset of data on the clinet, you have to add the feature layer to the map first and then use the queryFeature method on a FeatureLayerView object. Since the data is on the client, client side executes very fast 

// Both client-side and server-side queries can contaion a SQL expression and or/ a spatial relationship operator. The main differenc between Clinet and Server side is that clinet side is only possible after the feature layer is added to the map and its attrbutes are present. 

// in this exercise I will execute server and client side queries to find trailheads that are within a distance of 1500 meters from the center of the map and where you click

// so first we need to create a feature layer for the trailheads so we can execute the queries, and a graphics layer to draw the features returned. 

//so for the require statement we need to add the references for the FeatureLayer, GraphicLayer, and Graphic modules 

/* require([
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

    view.when (function() {
        queryFeatureLayer(view.center, 1500, "intersects");
    });

    // add a handler to call the queryFeatureLayer function and search for features when the map is clicked

    view.on("click", function (event) {
        queryFeatureLayer(event.mapPoint, 1500, "intersects");
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
    
    // Now that the layer is created and we can add graphics,  but first we will add code to execute the server size query
    // Server-side queries can be executed against a feature layer as soon as it is created and the layer does not need to be added to the map.

    //first we will create a function that accepts a point, distance to search, spatial relationship operator, and an optional SQL expression, and then builds a query that will return all of the feilds and geometry from the feature layer. 
    //Use the queryFeatures method to execute the query. When the features are returned, pass the results to the addGraphics function. 

    function queryFeatureLayer (point, distance, spatialRelationship, sqlExpression) {
        var query = {
            geometry: point,
            distance: distance,
            spatialRelationship: spatialRelationship,
            outFields: ["*"],
            returnGeometry: true,
            where: sqlExpression
        };
        featureLayer.queryFeatures(query).then(function (result) {
            addGraphics(result);
        });
    }

    // when the view is ready, call the queryFeatureLayer function and pass in the center of the view, 1500 as the distance in meters, and intersects as the spatial relationship operator to use. This will search for and display features in the center of the map.

    view.when (function() {
        queryFeatureLayer(view.center, 1500, "intersects");
    });

    // add a handler to call the queryFeatureLayer function and search for features when the map is clicked

    view.on("click", function (event) {
        queryFeatureLayer(event.mapPoint, 1500, "intersects");
    });

  });

  */