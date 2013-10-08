var scores = [];
var sum = 0;

for(var count = 0; count < 10; count++)
{
  var student_score = prompt('Input student score');
  student_score = parseFloat(student_score);
  scores.push(student_score);
}

//***********cumulatively sums each score in the array to the variable 'sum' (declared earlier)*********
for(var i = 0; i < scores.length; i++)
{
  sum += scores[i];
}

//*******************************calculates and logs the average***********************
var avg = sum / scores.length;
console.log("The average score is " + avg);


//debugger;

var sum_squares = 0;
//******************cumulatively calculates each value in the array minus the average, squared,
//***************************and adds to the variable sum_squares******************************
for(var x = 0; x < scores.length; x++)
{
  sum_squares += ((scores[x] - avg)*(scores[x] - avg));
}

//******************************calculates and logs the standard deviation***********************
var sd = Math.sqrt(sum_squares / (scores.length));
console.log("The standard deviation is " + sd);