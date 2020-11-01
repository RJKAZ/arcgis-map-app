mapboxgl.accessToken = 'pk.eyJ1IjoicmprYXoiLCJhIjoiY2tnemhjaW8yMDVuZjJxcnNpMTBsbGZqbCJ9.QxWhDuMo280IgRv_C4Xwdg';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.5, 40], // starting position
  zoom: 9 // starting zoom
});

// this is to add a navigation control 
map.addControl(new mapboxgl.NavigationControl());

// this is to add a geolocate button for the user to pinpoint where they are


map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
