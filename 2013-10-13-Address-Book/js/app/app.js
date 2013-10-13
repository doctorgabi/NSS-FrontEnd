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
}


function addPerson(){
  debugger;
  var name = $('#name').val();
  var address = $('#address').val();
  var website = $('#website').val();
  var email = $('#email').val();
  var photo = $('#photo').val();

  var person = {};

  person.name = name
  person.address = address
  person.website = website
  person.email = email
  person.photo = photo

  Δpeople.push(person);
}









//   Δperson.on('value', personChanged);


// function itemAdded(snapshot){
//   var item = snapshot.val();
//   createRow(item);
//   updateGrandTotal(item);
//   db.items.push(item);
// }

// function personChanged(snapshot){
//   var person = snapshot.val();

//   try{
//     $('#person').val(person.fullName);
//     $('#address').val(person.address);
//     db.person = person;
//   } catch(e) {
//     console.log(e);
//   }
// }




// function createRow(item){
//   var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
//   var $row = $(row);

//   $row.children('.name').text(item.name);
//   $row.children('.count').text(item.count);
//   $row.children('.value').text('$' + item.value + '.00');
//   $row.children('.room').text(item.room);
//   $row.children('.condition').text(item.condition);
//   $row.children('.date').text(item.date);

//   $('#items').append($row);
// }
