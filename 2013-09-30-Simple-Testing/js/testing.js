// test( "<name of function">, function() {
// deepEqual(<actual_value>, <expected_value>, "What this test is doing" );
// deepEqual(<actual_value>, <expected_value>, "testing this function with different arguments");
// });
/*at the top is the name of the test,
down in the body are the actual tests that you want to run.
Add a description for each one of the tests you're doing.
If actual and expected values are equal, test passes.
*/
/*
the first argument the 1+1 is the code I'm writin gthat I want tested. The second argument
is the answer I'm expecting
*/
test( "1 + 1", function() {
deepEqual(1 + 1, 2, "adding 1 and 1" );
});
// strings are like arrays so you can grab the first value like so: string[0]
// test( "nashville[0]", function() {
// deepEqual("nashville"[0], "n", "getting first letter from string");
// });

// want to create a function called 'add 3'. If the function isn't defined yet, need to put it in
// // main.js
test( "add_three", function() {
deepEqual(add_three(5), 8, "adding 3 to 5");
deepEqual(add_three(7), 10, "adding 3 to 7");
});

test( "square", function() {
deepEqual(square(3), 9, "squaring 3");
deepEqual(square(5), 25, "squaring 5");
});

test( "area", function() {
deepEqual(area(3, 5), 15, "finds the area of 3 and 5");
deepEqual(area(7, 5), 35, "finds the area of 7 and 5");
});

test( "volume", function() {
deepEqual(volume(3, 5, 2), 30, "finds the volume of 3 and 5 and 2");
deepEqual(volume(7, 5, 2), 70, "finds the volume of 7 and 5 and 2");
});

test( "power", function() {
  deepEqual(power(2, 0), 1, "2 to the 0th");
  deepEqual(power(2, 1), 2, "2 to the 1st");
  deepEqual(power(2, 2), 4, "2 squared");
  deepEqual(power(2, 3), 8, "2 cubed");
});

test( "greeting", function() {
  deepEqual(greeting("hello", "janet"), "hello, janet!", "saying hello to janet");
});

test( "pig_latin", function() {
  deepEqual(pig_latin("hello"), "elloha", "hello in pig latin");
});

test( "pig_greeting", function() {
  deepEqual(pig_greeting("hello", "janet"), "elloha, anetja!", "saying hello to janet in PL");
});

test( "pig_sentence", function() {
  var sentence = "four score and seven years ago";
  var expected = "ourfa coresa ndaa evensa earsya goaa";
  deepEqual(pig_sentence(sentence), expected, "gettysburg address in pig latin");
});

