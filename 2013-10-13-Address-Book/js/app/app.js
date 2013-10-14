'use strict';
// Database Schema
var Δdb;
var Δpeople;

// Local Schema
var db = {};
db.people = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://address-book-gse.firebaseio.com/');
  Δpeople = Δdb.child('people');
  $('#add').click(addPerson);
  Δpeople.on('child_added', updatePeopleView);
  $('.name').dblclick(removePerson);
}


function addPerson(){
  var name = $('#name').val();
  var address = $('#address').val();
  var website = $('#website').val();
  var email = $('#email').val();
  var photo = $('#photo').val();

  var person = {};

  person.name = name;
  person.address = address;
  person.website = website;
  person.email = email;
  person.photo = photo;

  Δpeople.push(person);
  $('#name').val('');
  $('#name').focus();
  $('#address').val('');
  $('#website').val('');
  $('#email').val('');
  $('#photo').val('');

}

function updatePeopleView(snapshot){
  var key = snapshot.name();
  var person = snapshot.val();
  db.people.push(person);
  var box = '<div class="person"><h5 class="name"></h5><img class="img"/><p class="address"></p><a class="website">visit website</a><p></p><a class="email"></a><p class="remove">(double-click name to remove person)</p></div>';
  var $box = $(box);

  $box.children('.name').text(person.name);
  $box.children('.img').attr('src', person.photo);
  $box.children('.address').text(person.address);
  $box.children('.website').attr('href', person.website);
  $box.children('.email').attr('mailto', person.email).text(person.email);

  $('#people').prepend($box);
}

function removePerson(){
  alert('the click handler works!')
  debugger;
  $(this).parent().remove();
}




