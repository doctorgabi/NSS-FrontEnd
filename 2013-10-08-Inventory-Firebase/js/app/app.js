'use strict';

var Δdb;
var Δitems;//database copy of array
var items;//local copy of array. both need to be synched.

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-gse.firebaseio.com/');
  Δitems = Δdb.child('items');//this sets up a pointer to a child node to the db.
  Δdb.on('value', receivedDb); //sets up a listener
}//when my value changes on my database,
  //call this anonymous funtion with the argument we'll call snapshot, (moved below to new function)
  //but could be called anything, and is provided live by the database.
  //The 'value' event is used to read the entire contents of a Firebase location.
  //It is triggered once with the
  //initial data and again every time the data changes. Your event callback is
  //passed a snapshot containing all data at that location, including child data.
  //If no data exists, the event will trigger with an empty snapshot.



function receivedDb(snapshot){//this function gets called initially and any time the data changes. Snapshot IS ALL the data.
    var inventory = snapshot.val();
    $('#person').val(inventory.fullName);
    $('#address').val(inventory.address);



    items = [];

    if(inventory.items){
      for(var property in inventory.items){
        console.log(inventory.items[property]);
        items.push(inventory.items[property]);
      }
    }
    // if(inventory.items){//does it exist? true or false
    //   items = inventory.items;
    // }else{
    //   items = [];
    // }

    // var $header = $('#items tr:first-child').detach();
    // $('#items').empty().append($header);
    // for(var i = 0; i < items.length; i++){
    //   createRow(items[i]);
    // }
  }

function save(){
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;//giving objects properties using object syntax
  inventory.address = address;

  Δdb.update(inventory);//db.set() is the command for writing stuff to the database
}

function add(){
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

  Δitems.push(item);//we just made our db Δitems set as our local items array
  //we need to give Firebase 2 things, a key and a value.
}

function createRow(item){
  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(item.name);
  //this is searching the children of $row (which are all 'td') for one with a class of '.name'
  $row.children('.count').text(item.count);
  $row.children('.value').text(item.value);
  $row.children('.room').text(item.room);
  $row.children('.condition').text(item.condition);
  $row.children('.date').text(item.date);

  $('#items').append($row);
}

