$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.color').on('click', clickColor);//these are dynamically generated on the server, but from the browsers perspective they're static
}

function clickColor(){
  $(this).css('background-color', 'grey');
}