function piglatin(word){
  return word.slice(1) + word[0] + 'a';
}

$(document).ready(initialize)

function initialize(){
  $('#convert').click(reverse_pig);
    // if someone clicks the button with the 'convert' id, run the function defined below
}

function reverse_pig(sentence){
  debugger;
  //convert the sentence into an array called words, split removes the comma and space
  var words = $('#original').val().split(', ');
  //reverse the array and store in a new variable called reverse_words(note the words array reverses in memory at this time too)
  var reverse_words = words.reverse();
  //loop through reverse_words and use the piglatin function on them all into a new 'pigwords' array
  var pigwords = []
  for(i = 0; i < reverse_words.length; i++)
  {
    pigwords.push(piglatin(reverse_words[i]));
  }
  //join the pigwords array into a new pigsentence variable, a string delimited with '; '
  var pig_sentence = pigwords.join('; ');
  //find the input with id result, get it's value, change it to whatever is in the pig_sentence variable
  $('#result').val(pig_sentence);
}

    //These were the ids:
    // %input#original{type: 'text'}
    // %input#convert{type: 'button', value: 'Reverse Pig!'}
    // %input#result{type: 'text'}