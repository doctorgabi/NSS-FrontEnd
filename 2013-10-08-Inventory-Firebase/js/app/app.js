'use strict';

var db;
var items;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);
  db = new Firebase('https://inventory-gse.firebaseio.com/');
  items = db.child('items');//this adds another child node to the db.

  db.on('value', function(snapshot) {//when my value changes on my database,
  //call this anonymous funtion with the argument we'll call snapshot,
  //but could be called anything, and is provided live by the database.
  //The 'value' event is used to read the entire contents of a Firebase location.
  //It is triggered once with the
  //initial data and again every time the data changes. Your event callback is
  //passed a snapshot containing all data at that location, including child data.
  //If no data exists, the event will trigger with an empty snapshot.
    var inventory = snapshot.val();
    $('#person').val(inventory.fullName);
    $('#address').val(inventory.address);
  });
}

function save(){
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;//giving objects properties using object syntax
  inventory.address = address;

  db.set(inventory);//db.set() is the command for writing stuff to the database
}

function add(){
  var name = $('#name').val();
  var count = $('#amount').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(name);
  //this is searching the children of $row (which are all 'td') for one with a class of '.name'
  $row.children('.count').text(count);
  $row.children('.value').text(value);
  $row.children('.room').text(room);
  $row.children('.condition').text(condition);
  $row.children('.date').text(date);

  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  items.push(item);
  //push adds a child item to the array items
  $('#items').append($row);
}
