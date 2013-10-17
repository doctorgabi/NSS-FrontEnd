'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δfavourites;
// Local Schema (defined in keys.js)
//split out for testing later.
db.positions = [];
db.path = [];
db.favourites = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);//this was what was created in keys.js
  Δpositions = Δdb.child('positions');
  Δfavourites = Δdb.child('favourite');
  Δpositions.on('child_added', dbPositionAdded);
  Δfavourites.on('child_added', dbFavouriteAdded);
  $('#start').click(clickStart);
  $('#erase').click(clickErase);
  $('#stop').click(clickStop);
  $('#add').click(clickAdd);
  initMap(36, -86, 5);
  Δpositions.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dbPositionAdded(snapshot){
  var position = snapshot.val();
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);

  db.positions.push(position);

  if(db.positions.length === 1){
    htmlAddStartIcon(latLng);
    htmlInitializePolyLine();
  }
  db.path.push(latLng);
  db.marker.setPosition(latLng);
  htmlCenterZoom(latLng);
}

function dbFavouriteAdded(snapshot){
  var favourite = snapshot.val();
  var fLatLong = new google.maps.LatLng(favourite.latitude, favourite.longitude);
  db.favourites.push(favourite);
  // db.marker.setPosition(fLatLong);
  markFavourite(fLatLong);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddStartIcon(latLng){
  var image =  'img/gb.png';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});//db.map gets declared in the initmap function
//when you create a marker it's asking you which map do you want to put it on and
//at which location.
}

function markFavourite(fLatLong){
  var favouriteImage = 'img/heart.png';
  db.marker = new google.maps.Marker({map: db.map, position: fLatLong, icon: favouriteImage});
  // db.marker.setPosition(fLatLong);
}

function htmlInitializePolyLine(){
  var polyLine = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  db.path = polyLine.getPath();
}

function htmlCenterZoom(latLng){
  db.map.setCenter(latLng);
  db.map.setZoom(20);
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //



function clickStart(){
  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 1000,
    timeout           : 60000
  };
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickErase(){
  Δpositions.remove();
  db.positions = [];
  db.path = [];
}

function clickStop(){
  navigator.geolocation.clearWatch(db.watchId);
}

function clickAdd(){
  if(!$('#place').val()){
    alert('enter the place name');
  }else{
    var favouriteOptions = {
      enableHighAccuracy: true,
      maximumAge        : 0,
      timeout           : 60000
    };
    navigator.geolocation.getCurrentPosition(favouriteSuccess, favouriteError, favouriteOptions);
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.SATELLITE};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);//this is where the id goes, it's called map canvas, it's Google's default.
}

function geoSuccess(location) {//this is where we receive the position so it's where we should be pushing from
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
}

function favouriteSuccess(location) {
  console.log('the function is being called');
  var favourite = {};
  favourite.latitude = location.coords.latitude;
  favourite.longitude = location.coords.longitude;
  favourite.name = $('#place').val();
  Δfavourites.push(favourite);
  $('#place').val('');
}

function favouriteError() {
  console.log('Sorry, no position is available.');
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
