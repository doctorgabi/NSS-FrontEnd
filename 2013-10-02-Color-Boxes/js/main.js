$(document).ready(initialize);

function initialize()
{
  $('#colorbutton').click(makeColorBoxes);
  $('#clearinput').click(clearInput);
  $('#clearboxes').click(clearBoxes);
  $('#colorstring').focus();
}

function clearBoxes()
{
  $('#boxes').empty();//removes the contents of the boxes div
  clearInput();//calls an existing function, to empty input and refocus
}

function clearInput()
{
  $('#colorstring').val('');//empties the contents on click
  $('#colorstring').focus();//refocuses the keyboard on that input field
}

function makeColorBoxes()
{
  // debugger;
  var colorstring = $('#colorstring').val();
  var colors = colorstring.split(', ');
  for(var i = 0; i < colors.length; i++)
  {
    var $color = $('<div>');
    $color.addClass('box');//don't put the . in there, it's assumed
    $color.text(colors[i]);
    $color.css('background-color', colors[i]);
    $('#boxes').prepend($color);
  }
}