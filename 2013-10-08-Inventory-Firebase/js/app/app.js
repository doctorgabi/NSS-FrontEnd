'use strict';

//Database schema
var Δdb;
var Δitems;//database copy of array
var Δperson;
var items = [];//local copy of array. both need to be synched.


//local schema
var db = {};
db.person = {};
db.items = [];
db.statistics = {};
db.statistics.grandTotal = 0;


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-gse.firebaseio.com/');
  Δitems = Δdb.child('items');//this sets up a pointer to a child node to the db.
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged);
  Δitems.on('child_added', itemAdded);
}


// function sumTotalValue(item){//from personChanged and itemAdded functions
//   var itemValue = (item.value)*(item.count);
//   db.statistics.grandTotal += itemValue;
//   $('#total').text('$' + db.statistics.grandTotal + '.00');
// }


function itemAdded(snapshot){//from items.on event handler
  var newItem = snapshot.val();
  createRow(newItem);
  db.items.push(newItem);
  sumTotalValue(newItem);
}


function personChanged(snapshot){//from person.on event handler
  var person = snapshot.val();

  try{
    $('#person').val(person.fullName);
    $('#address').val(person.address);
    db.person = person;
  }catch(e){//e is the error that's returned if the try fails
    console.log('You returned the following error: ' + e);
  }
  sumTotalValue();
}


function save(){//from click save event handler
  var fullName = $('#person').val();
  var address = $('#address').val();
  var person = {};
  person.fullName = fullName;//giving objects properties using object syntax
  person.address = address;

  Δperson.set(person);//db.set() is the command for writing stuff to the database
}

function add(){//from click add event handler
  var name = $('#name').val();
  var count = $('#amount').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push();//we just made our db Δitems set as our local items array
  //we need to give Firebase 2 things, a key and a value.
}

function createRow(snapshot){//from itemAdded function
  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);
  debugger;


  $row.children('.name').text(item.name);
  //this is searching the children of $row (which are all 'td') for one with a class of '.name'
  $row.children('.count').text(item.count);
  $row.children('.value').text('$' + item.value);
  $row.children('.room').text(item.room);
  $row.children('.condition').text(item.condition);
  $row.children('.date').text(item.date);

  $('#items').append($row);
}

