'use strict';
$(document).ready(initialize);
function initialize(){
  $('#due').focus();
  $('#addTask').click(addTask);
  $('table').on('click', '.remove', remove);
  $('table').on('click', '.voteUp, .voteDown', vote);
  $('table').on('click', '.done', done);
}

//***********ADDS A WHOLE NEW TASK ROW******************//
function addTask(){
  //*********creates table row and data cells************//
  var $tr = $('<tr>');
  var $dateData = $('<td>');
  var $taskData = $('<td>');
  var $colorData = $('<td>');
  var $doneData = $('<td>');
  var $removeData = $('<td>');
  var $voteData = $('<td>');
//*************connects inputs to data cells**************//
  var $date = $('#due').val();
  $dateData.append($date);

  var $task = $('#task').val();
  $taskData.append($task);

  var $color = $('#color').val();
  var $taskColor = $('<div>');
  $taskColor.addClass('taskColor');
  $taskColor.css('background-color', $color);
  $colorData.append($taskColor);

  var $done = $('<input>');
  $done.addClass('done');
  $done.attr('type', 'checkbox');
  $doneData.append($done);

  var $remove = $('<input>');
  $remove.addClass('remove');
  $remove.attr({type: 'button', value: 'Remove'});
  $removeData.append($remove);

  var $voteUp = $('<img>');
  var $voteDown = $('<img>');
  $voteUp.attr('src', 'images/up.png');
  $voteDown.attr('src', 'images/down.png');
  $voteUp.addClass('voteUp');
  $voteDown.addClass('voteDown');
  $voteData.append($voteUp, $voteDown);
//**********appends data to row then row to table**********//
  $tr.append($dateData, $taskData, $colorData, $doneData, $removeData, $voteData);
  $('table').append($tr);
//**********empties inputs and refocuses**************//
  $('#due').val('');
  $('#task').val('');
  $('#color').val('');
//******return focus to the first input box*********//
  $('#due').focus();
}

//*********GREY OUT & STRIKETHROUGH DONE TASKS********//
function done(){
  var $row = $(this).parent().parent();
  var $done = $(this);
  if($done.prop('checked')){
    $(this).parent().prevAll().css('text-decoration', 'line-through');
    $row.css('background-color', 'rgba(200, 200, 200, 0.5)');
  }
  if(!$done.prop('checked')){
    $row.css('background-color', 'white');
    $(this).parent().prevAll().css('text-decoration', 'none');
  }
}

//*****VOTES A ROW HIGHER OR LOWER(except if at top)***//
function vote(){
  var $vote = $(this);
  var $row = $(this).parent().parent();
  if($vote.hasClass('voteUp')){
    if(!$row.prev().hasClass('titleRow'))
    {
      $row.prev().before($row);
    }
  }else{
    $row.next().after($row);
  }
}

//*************REMOVES A WHOLE ROW******************//
function remove(){
  var $row = $(this).parent().parent();
  $row.remove();
}
