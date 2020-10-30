require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
  ], function(Map, MapView, FeatureLayer) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 12
    });

    

    //at the end of the code, create a FeatureLayer and set the url to access the Trails (Styled) feature layuer, the outputFeilds to return all fields and values, and the popupTemplate to show the trail name and the elevation gain value in the popup content. Add the layer to the map

    var featureLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
        outFields: ["*"], //return all fields so it can be quiered client-side
        popupTemplate: {
            //enable a pop up
            title: "{TRL_NAME}", // Show attribute value
            content: "The Trail elevation gain is {ELEV_GAIN} ft." // Display in pop-up
        }
    });

    map.add(featureLayer);

    // now create SQL expressions
    //define a list of SQL expressions and use the list to generate a Select HTML element with an option for each expression. Add the element to the top-right of the view. 

    var sqlExpressions = [
        "TRL_ID = 0",
        "TRL_ID > 0",
        "USE_BIKE = 'Yes'",
        "USE_BIKE = 'No'",
        "ELEV_GAIN < 1000",
        "ELEV_GAIN > 1000",
        "TRL_NAME = 'California Costal Trail"
    ];

    var selectFilter = document.createElement("select");
    selectFilter.setAttribute("class", "esri-widget esri-select");
    selectFilter.setAttribute(
        "style",
        "width: 275px; font-family: Avenir Next W00; font-size: 1em;"
    );

    sqlExpressions.forEach(function (sql) {
        var option = document.createElement("option");
        option.value = sql;
        option.innerHTML = sql;
        selectFilter.appendChild(option);
    });

    view.ui.add(selectFilter, "top-right");

// apply a server side function. You can apply a server side filter to limit the features returned from a feature layer by setting the definitionExpression.

// Create a function that sets the definitionExpression for a feature layer.

function setFeatureLayerFilter(expression) {
    featureLayer.definitionExpression = expression;
}

// add an event handler to the selectFilter element to get the selected sql expression and call the setFeatureLayerFilter function

selectFilter.addEventListener('change', function (event) {
    setFeatureLayerFilter(event.target.value);
});

// apply a client side filter

// you can apply a client-side filter by filtering the FeatureLayerView after the features have been loaded and the FeatureLayerView is ready. This type of filtering allows you to apply both SQL expressions and spatial relationship operators. and is often faster than a server-side filter.

// create a function that gets a featureLayerVIew and applies a filter with the SQL expression when the layer is ready.

function setFeatureLayerViewFilter(expression) {
    view.whenLayerView(featureLayer).then(function (featureLayerView) {
        featureLayerView.filter = {
            where: expression
        };
    });
}

// comment out the setFeatureLayerFilter function and call the setFeatureLayerViewFilter function passing it in the selected SQL expression

selectFilter.addEventListener("change", function (event) {
    setFeatureLayerViewFilter(event.target.value);
});

  });