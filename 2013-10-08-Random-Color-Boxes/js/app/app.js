'use strict';

$(document).ready(initialize);

var timer = 0;

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
}


function start(){
  var delay = parseFloat($('#delay').val(), 10);
  delay *= 1000;//converts s to ms
  timer = setInterval(boxGenerator, delay);
}

function boxGenerator(){
  var dimensions = $('#dimensions').val().split(', ');
  var w = dimensions[0];
  var h = dimensions[1];
  var $box = $('<div>');
  $box.addClass('box');
  $box.width(w);//could do this as .css('width', w)
  $box.height(h);
  $box.css('background-color', colorGenerator);
  $('#colors').prepend($box);
}

function colorGenerator(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var a = Math.random();
  return('rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');
}

function stop(){
  clearInterval(timer);
}
