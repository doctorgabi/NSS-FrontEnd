/*this is a multi-line
  javascript
  file
*/

var first_name = prompt('What is your given name?');
var last_name = prompt('What is your last name?');
var gender = prompt('What is your gender');
var age = prompt('What is your age?');
var full_name = first_name + ' ' + last_name;
age = parseInt(age); //any time prompt returns something
//it's always a string so we need in this case to
// convert it to an integer with parseInt.
var bday_month = prompt('What month were you born in?');
var current_month = prompt('What month is it right now?');
/*you can make the computer stop and freeze in time
and go in and check things out and make it
execute code one line at a time, say you want to stop on line
10 and use keyword 'debugger'*/
//debugger;

var test1 = prompt("score for test 1?");
test1 = parseFloat(test1);/*converts the string number response to a number*/

var test2 = prompt("score for test 2?");
test2 = parseFloat(test2);

var test3 = prompt("score for test 3?");
test3 = parseFloat(test3);

var sum = 0;
sum += test1;
sum += test2;
sum += test3;

var average = sum / 3;
if(average < 70 )
  console.log('you failed');
else if ((average >= 70) && (average < 80))
  console.log('you made a C');
else if ((average >= 80) && (average < 90))
  console.log('you made a B');
else
  console.log('you made an A!!!');


console.log("Your full name is : " + full_name);
console.log("The average of your test scores is : " + average);

var null_variable = null, undefined_variable;

if((first_name == 'gabrielle') && (last_name == 'epstein'))
{
  // if you only have one line of code
  // you don't need the braces
  // but if you leave them that's cool too
  console.log('hey, i recognise you!');
}

if ((gender == 'female') && ( age >= 21))
    console.log('free drinks, ladies night! woot!');
else if(gender == 'male' && age >=21)
  console.log('looks like you are buying!');
else
  console.log('not old enough to drink or indeterminate gender');

var can_have_cake = (current_month == bday_month);
// you should be able to look at the var name and tell whether or
//not it's a boolean if it has words like 'can', 'is', etc.
//will evaluate to true or false. Name it in such a way that you can tell.
var cake = can_have_cake ? "chocolate" : "vanilla";
// this is the ternary operator. if it's your birthday
//you can have chocolate, else if it's not, you get plain old vanilla
console.log("Marie Antoinette says that you are eating " + cake);

switch(bday_month)
{
  case 'january':
    console.log('you are a capricorn');
    break;
  case 'february':
    console.log('you are an aquarius');
    break;
  default:
    console.log('you are not of this world, god speed!');
}