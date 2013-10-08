$(document).ready(initialize);

function pig(original)
{
  return original.slice(1) + original[0] + 'a';
}


function initialize()
{
  $('#pig').click(pig_latinize);
}

function pig_latinize()
{
  debugger;
  var original = $('#original').val();
  var piglatin = pig(original);
  $('#piglatin').val(piglatin);
}