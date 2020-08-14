require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function (Map, MapView, FeatureLayer) {

    var map = new Map({
        basemap: "topo-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80500, 34.02700],
        zoom: 13
    });

    // we are now creating an object and defining it as a simple render, using the image link, it will display an image of a hiker on the map.

    var trailheadsRenderer = {
        "type": "simple",
        "symbol": {
            "type": "picture-marker",
            "url": "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            "width": "18px",
            "height": "18px"
        }
    }



    //now to show labels indicating the trail names, we are creating another object that will create the label

    var trailheadsLabels = {
        symbol: {
            type: "text",
            color: "#FFFFFF",
            haloColor: "#5E8D74",
            haloSize: "2px",
            font: {
                size: "12px",
                family: "Noto Sans",
                style: "italic",
                weight: "normal"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.TRL_Name"
        }
    };

    // Now we create a trailheads "FeatureLayer" that combines the renderer and label objects, and then we add the trailheads to the map

    var trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
        renderer: trailheadsRenderer,
        labelingInfo: [trailheadsLabels]
    });

    map.add(trailheads);

    // Now we will style the trail width by elevation, we will create a simpleRenderer object with VisualVariables defined to make the trails with greater elevation change their width then trails with smaller elevation changes. 

    var trailsRenderer = {
        type: "simple",
        symbol: {
            color: "#BA55D3",
            type: "simple-line",
            style: "solid"
        },
        visualVariables: [
            {
                type: "size",
                field: "ELEV_GAIN",
                minDataValue: 0,
                maxDataValue: 2300,
                minSize: "3px",
                maxsize: "7px",
            }
        ]
    };

    //create a trails FeatureLayer and set the url, renderer, and opacity proporties, and add it to the map

    var trails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: trailsRenderer,
        opacity: .75
    });

    map.add(trails, 0);

    // now we create a simple renderer object with symbol that is a simple short-dot pink line

    var bikeTrailsRenderer = {
        type: "simple",
        symbol: {
            type: "simple-line",
            style: "short-dot",
            color: "#FF91FF",
            width: "1px"
        }
    };

    var bikeTrails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        renderer: bikeTrailsRenderer,
        definitionExpression: "USE_BIKE = 'YES'"
    });

    map.add(bikeTrails, 1);

    // style park areas with unique colors

    function createFillSymbol(value, color) {
        return {
            "value": value,
            "symbol": {
                "color": color,
                "type": "simple-fill",
                "style": "solid",
                "outline": {
                    "style": "none"
                }
            },
            "label": value
        };
    }

    var openSpacesRenderer = {
        type: "unique-value",
        field: "TYPE",
        uniqueValueInfos: [
            createFillSymbol("Natural Areas", "#9E559C"),
            createFillSymbol("Regional Open Spaces", "#A7C636"),
            createFillSymbol("Local Park", "#149ECE"),
            createFillSymbol("Regional Recreation Park", "#ED5151")
        ]
    };

    var openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
        renderer: openSpacesRenderer,
        opacity: 0.20
    });

    map.add(openspaces, 0);




});