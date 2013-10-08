$(document).ready(initialize);

function change_div_text()
{
  var name = $('#name').val();
  var color = $('#color').val();
  $('#b').text(name).css('background-color', color);/*this is called method or function chaining*/
}

function age_verification()
{
  debugger;
  var age = $('#age').val();
  age = parseInt(age);

    if(age < 21)
      $('#age_div').text('No drink for you!').css('background-color', 'red');
    else
      $('#age_div').text('more please!').css('background-color', 'green');
}

function initialize(){
  $('#clicker').click(change_div_text);
  $('#age_check').click(age_verification);
}


/*Any element on your page, a span, a header, etc, you want to get the text in Any
it's .text, for form elements it's .val*/
/*function alert_me()
{
  alert('you have alerted me');
}

 function initialize() {
   $('#clicker').click(alert_me);/*this isn't calling the function
  or it'd look like alert_me(), instead it says run the function
  if this thing is clicked. Otherwise it'd run it immediately  on
    seeing it*/



// }
/*this is a getter - it gets you the info on a node*/
//   $('div').css('background-color', 'red');
//   $('div').css('font-size', '25px');
//   $('div').css('color', 'yellow');

/*this is a setter - it sets the info of a node*/
//   var color = prompt("What color?");
//   $('div').css('background-color', color);
//   var size = prompt("What size font?");
//   $('div').css('font-size', size);

  // var selector = prompt('Which div?');
  // var cls = prompt('Class to add?');
  // var new_text = prompt('What would you like to say?');
  // $(selector).addClass(cls);
  // $(selector).text(new_text);/*.text changes the text*/
  // var selector_to_hide = prompt("Which node do you want to hide");
  // $(selector_to_hide).hide();/*inverse = .show()*/

