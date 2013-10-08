//*************Individual coding first project:*********************//
// ask the person’s name
// ask the person’s initial balance
// add 3 separate deposits (all different amounts)
// subtract 3 separate withdraws (all different amounts)
// output their name and balance
// if their balance is less than $0.00 then charge them $50.00
//in overdraft fees - be sure to include this
//fee in their final balance

// var first_name = prompt('What is your first name?');
// var surname = prompt('What is your surname?');
// var name = first_name + ' ' + surname;

// var initial_balance = prompt('What is your initial balance?');
// initial_balance = parseInt(initial_balance);
// console.log(name + ' your balance is $' + initial_balance);

// var current_balance = initial_balance

// var deposit1 = prompt('Your balance is $' + current_balance +'. How much would you like to deposit?');
// deposit1 = parseInt(deposit1)
// current_balance += deposit1;
// console.log(name + ', your new balance is $' + current_balance);

// var deposit2 = prompt('Your balance is $' + current_balance +'. How much would you like to deposit this time?');
// deposit2 = parseInt(deposit2);
// current_balance += deposit2;
// console.log(name + ', your new balance is $' + current_balance);

// var deposit3 = prompt('Your balance is $' + current_balance +'. How much would you like to deposit?');
// deposit3 = parseInt(deposit3);
// current_balance += deposit3;
// console.log(name + ', your current balance is $' + current_balance);

// var withdraw1 = prompt('Your balance is $' + current_balance +'. How much would you like to withdraw?');
// withdraw1 = parseInt(withdraw1);
// current_balance -= withdraw1;
// console.log(name + ', your current balance is $' + current_balance);

// var withdraw2 = prompt('Your balance is $' + current_balance +'. How much would you like to withdraw this time?');
// withdraw2 = parseInt(withdraw2);
// current_balance -= withdraw2;
// console.log(name + ', your current balance is $' + current_balance);

// var withdraw3 = prompt('Your balance is $' + current_balance +'. How much would you like to withdraw?');
// withdraw3 = parseInt(withdraw3);
// current_balance -= withdraw3;
// console.log(name + ', your current balance is $' + current_balance);

// var final_balance = current_balance
// if (final_balance < 0) {
//   final_balance -= 50;
//   console.log(name + ', you went overdrawn and incurred a fee. Your final balance is $' + final_balance);
// }
// else
// {
//   console.log(name + ', your final balance is $' + final_balance);
// }

//chyld's version - note there are tons of ways to do this
//and there's not necessarily a right and a wrong way.

var name = prompt('What is your name?');
var balance = prompt('What is the initial balance?');
balance = parseFloat(balance);

var dep1 = prompt('Deposit 1?');
var dep2 = prompt('Deposit 2?');
var dep3 = prompt('Deposit 3?');
var with1 = prompt('Withdraw 1?');
var with2 = prompt('Withdraw 2?');
var with3 = prompt('Withdraw 3?');

debugger;
//don't guess where the problem is, walk through it line by line
//and you'll see where the computer freaks out.
dep1 = parseFloat(dep1);
dep2 = parseFloat(dep2);
dep3 = parseFloat(dep3);
with1 = parseFloat(with1);
with2 = parseFloat(with2);
with3 = parseFloat(with3);

//now we have all the inputs so we can do our algorythms.

var deposits = 0;
deposits += dep1;
deposits += dep2;
deposits += dep3;

var withdraws = 0;
withdraws += with1;
withdraws += with2;
withdraws += with3

balance += (deposits - withdraws);

balance -= (balance < 0) ? 50 : 0;
// balance is equal to itself minus 50 if the balance is less than zero.
console.log('Your balance is: ' + balance);
