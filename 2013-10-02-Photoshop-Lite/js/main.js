'use strict';

$(document).ready(initialize);

function initialize(){
  $('#add_color').click(addColor);
  $('#add_box').click(addBox);
  $('#colors').on('click', '.box', colorPaletteClicked);//on method for dynamically generated stuff
  $('#boxes').on('mouseover', '.miniBox', canvasHover);
  //theres a div called boxes that already exists and inside of him
  //are things with a class of miniBoxes. When I hover on one of them
  // which will be called 'this', I want you to run canvasHover on him.
}

function canvasHover(){
  var $canvas = $(this);
  var brushColor = $('#brush').css('background-color');
  $canvas.css('background-color', brushColor);
}

function addBox()
{
  var amount = $('#amount').val();
  //(should parse here with base 10)
  for(var i = 0; i < amount; i++)
  {
    var $miniBox = $('<div>');//<>does not mean search for div, it means create a div
    $miniBox.addClass('miniBox');//make sure you create this div INSIDE the loop
    $('#boxes').prepend($miniBox);
  }
}

function colorPaletteClicked()
{
  var $box = $(this);
  var color = $box.css('background-color');
  $('#brush').css('background-color', color);
}

function addColor()
{
  var color = $('#color').val();
  var $div = $('<div>');
  $div.addClass('box');
  $div.css('background-color', color);
  $('#colors').prepend($div);
  $('#color').val('');
  $('#color').focus();
}
