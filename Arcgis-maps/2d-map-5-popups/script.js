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
      center: [-118.80500, 34.02700],
      zoom: 13
    });

    // the <b> tag specifies bold text
    // now we are creating a popup template that sets the title to "Trailhead" and the content to a custome HTML String.

    var popupTrailheads = {
        title: "{TRL_NAME}",
        content:
        "<b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    };

    var trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
        popupTemplate: popupTrailheads
    });

    map.add(trailheads);

    // now we create a popupTemplate that sets the title to Trail Information and uses a function to render the content. Apply the popupTemplate to the layer and add the layer to the map

    var popupTrails = {
        title: "Trail Information",
        content: function () {
            return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing."; 
        }
    };

    var trails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
        outFields: ["TRL_NAME", "ELEV_GAIN"],
        popupTemplate: popupTrails
    });

    map.add(trails, 0);

    // The feature layer will autocast the popupTemplate and create a class instance from the object.

    // now we will create a popup template that sets the title to {PARK_NAME} and defines an array of feildsInfos to be displayed in the content. This will create a table view with the feild name on the left and field value on the right. Apply the popupTemplate to the layer and add the layer to the map
    
    var popupOpenspaces = {
        title: "{PARK_NAME}",
        content: [
            {
                type: "fields",
                fieldInfos: [
                    {
                        fieldName: "AGENCY_NAME",
                        label: "AGENCY",
                        isEditable: true,
                        tooltip: "",
                        visible: true,
                        format: null,
                        stringFieldOption: "text-box"
                    },
                    {
                        fieldName: "TYPE",
                        label: "Type",
                        isEditable: true,
                        tooltip: "",
                        visible: true,
                        format: null,
                        stringFieldOption: "text-box"
                    },
                    {
                        fieldName: "ACCESS_TYP",
                        label: "Access",
                        isEditable: true,
                        tooltip: "",
                        visible: true,
                        format: null,
                        stringFieldOption: "text-box"
                    },
                    {
                        fieldName: "GIS_ACRES",
                        label: "Acres",
                        isEditable: true,
                        tooltip: "",
                        visible: true,
                        format: {
                            places: 2,
                            digitSeperator: true
                        },
                        stringFieldOption: "text-box"
                    },
                ]
            }
        ]
    };
    var openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
        outFields: ["TYPE", "PARK_NAME", "AGNCY_NAME", "ACCESS_TYP", "GIS_ACRES"],
        popupTemplate: popupOpenspaces
    });

    map.add(openspaces, 0);

  });