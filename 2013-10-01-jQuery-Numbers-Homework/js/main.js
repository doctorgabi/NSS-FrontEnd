$(document).ready(initialize);

function conversion(input)
{
  //splits the input two values into an array
  var values = $('#input').val().split(', ');
  //takes the first value in the array and parses it
  var number = parseInt(values[0]);
  //makes an empty array for later
  var digits = [];
  //loops up to the number of the first value and
  //puts those numbers in the digits array
  for(i = 1; i < number+1; i++)
  {
    digits.push(i);
  }
  //makes an empty array
  var products = [];
  //takes the 2nd input value and parses it
  var multiplier = parseInt(values[1]);

  //multiplies the digits array by the multiplier
  //and pushes to the products array
  for(i = 0; i < digits.length; i++)
  {
    products.push(digits[i] * multiplier);
  }

  //creates a baseline for the summing of the products
  var sum = 0;
  //sums all the products in the products array
  for(i = 0; i < products.length; i++)
  {
    sum += products[1];
  }
  //joins the products to a string concatenated with ' + '
  var products_string = products.join(' + ');
  //the final result of the calculate function is returned,
  //concatenating the products string with the sum value
  return products_string + " = " + sum;
}

//nothing will run until 'calculate' is clicked (event handler),
//at that time the display result function will run
function initialize()
{
  $('#calculate').click(display_result);
}

function display_result()
{
  //captures the values of the input in a variable
  var input = $('#input').val();
  //and passes it to a variable called converted,
// which runs the conversion function on the input
  var converted = conversion(input);
//Finally the result box is updated with the output
  $('#result').val(converted);
}