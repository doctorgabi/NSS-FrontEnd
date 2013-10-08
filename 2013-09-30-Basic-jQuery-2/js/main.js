$(document).ready(initialize);

function initialize()
{
  $('#button1').click(change_green);
  $('#name_btn').click(count);
}

function change_green()
{
  $('#green').css('background-color', 'green');
}
/*$('#green').css({'background-color': 'green', 'color': 'yellow'});this is an object*/






function count()
{
  var num = $('#name_txt').length;
}

function name_chars()
{
  debugger;
  var name = $('#name_txt').val();
  var length = name.length;
  $('#name_div').text ('Your name has ' + length + ' characters.');
}


// #name_txt'Enter your name!'
// #name_btn'Count the characters!'
// #name_div BLANK