$(document).ready(initialize);

function initialize()
{
  $('#make_boxes').click(makingBoxes);
}

function makingBoxes()
{
  var numberOfBoxes = $('#amount').val();
  numberOfBoxes = parseInt(numberOfBoxes);

  for(i=0; i < numberOfBoxes; i++)
  {
    var $div = $('<div>');//create a new div object every time the loop goes round
    //when you see the <> you're creating a div, without you're searching for divs
    $div.addClass('box');//add a class to him
    $div.text(i);//will show what number each box is
    $('#boxes').append($div);//append that div to our DOM tree
  }
}
