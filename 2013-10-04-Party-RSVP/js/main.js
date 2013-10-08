'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.nukeButton', nuke);
  $('table').on('click', '.up, .down', vote);
}
//*********vote up or down unless you hit the title row*****//
function vote(){
  var $vote = $(this);
  var $voteRow = $(this).parent().parent();
  if($vote.hasClass('up')){
    if(!$voteRow.prev().hasClass('titleRow')){
      $voteRow.prev().before($voteRow);
    }
  }else{
    $voteRow.next().after($voteRow);
  }
}
//******get rid of the whole row*************//
function nuke(){
  var $button = $(this);
  var $tr = $button.parent().parent();
  $tr.remove();
}

//*************submit rsvp***********//
function rsvp(){
  var $button = $(this);
  var $textbox = $button.prev();
  var text = $textbox.val();
  var items = text.split(', ');
  var name = items[0];
  var food = items[1];
  var $nameTD = $button.parent().prev().prev();
  var $foodTD = $button.parent().siblings('.food');
  $nameTD.text(name);
  $foodTD.text(food);
  // $button.parent().prev().prev().text(name);
  // $button.parent().prev().text(food);
  // $button.parent().siblings('.name').text(name);
  // $button.parent().siblings('food').text(food);
}

function addRow(){
  var $tr = $('<tr>');
  var $name = $('<td>');
  $name.addClass('name');
  var $food = $('<td>');
  $food.addClass('food');
  var $ctrl = $('<td>');
  $ctrl.addClass('ctrl');
  var $nukeBox = $('<td>');
  $nukeBox.addClass('nukeBox');
  var $vote = $('<td>');
  $vote.addClass('vote');

//*********input name and food by user************//
  var $input = $('<input>');
  $input.attr('type', 'text');
//*********RSVP button************//
  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.val('RSVP!');
  $button.addClass('rsvp');
//*********nuke button************//
  var $nukeButton = $('<input>');
  $nukeButton.attr('type', 'button');
  $nukeButton.val('NUKE!');
  $nukeButton.addClass('nukeButton');
  $nukeBox.append($nukeButton);
//*********vote buttons************//
  var $voteUp = $('<img>');
  var $voteDown = $('<img>');
  $voteUp.attr('src', 'images/up.png');
  $voteDown.attr('src', 'images/down.png');
  $voteUp.addClass('up');
  $voteDown.addClass('down');

//*********append all to the row & table************//
  $ctrl.append($input, $button);
  $vote.append($voteUp, $voteDown);
  $tr.append($name, $food, $ctrl, $nukeBox, $vote);
  $('table').append($tr);

  $input.focus();
}