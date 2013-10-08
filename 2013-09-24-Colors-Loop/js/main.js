// //we want to prompt the user for a list of colors and
// // ask what's their favourite, get them to quit
// //when they're done, then shove them into an array.
// //if you didn't know how to loop you'd have to copy paste
// //the first question. If it seems iterative then you should
// //probably loop.
// //if they type in a color we want to drop into a loop.
// //there's 2 basic types, the for loop where you know
// //how many times you want to loop ahead of time, or the
// //while loop when you don't. The latter is sort of like
// //an if statement. Inside its parentheses is something
// //boolean.
// //same as if and for loops, you don't need the braces
// //if you only want to do one thing.
// // var response = prompt('Enter a color or leave blank:');
// // while(response) <or, say, (response != "")>
// // {

// // }
// // while the boolean is true it'll run forever. 'true' and '1'
// // are infinitely true so don't put either in the code!
// // when it gets to the bottom it'll flip back to the top and do
// //it again.
// // var colors = [];

// // var response = prompt('Enter a color or quit:');
// // while(response != 'quit')
// // {
// //   colors.push(response);
// // }
// //the loop here runs from lines 27 to 30. So it'll keep iterating
// //forever. So we have to ask them again, as follows:

// var colors = [];

// // debugger;

// var response = prompt('Enter a color');
// while(response)
// {
//   colors.push(response);
//   response = prompt('Enter a color');
// }
// // //in this one, an empty string means false (it's falsey!).

// // //next is a for loop. let's say we want three colors and
// // //then we want to print those out to the console. We know
// // //we want the length of our array is 3

// // for(var count = 0; count < colors.length; count++)
// // {
// //   statements here...;
// // }

// // it's in 3 separate parts delineated by a ;,
// //the first starts a counting
// // variable that starts ocunting at some number. in this case it's set to 0. we
// // initialize that variable and ******that only happens once*********.
// // the middle part is saying, 'is 'count' less than colors.length? If it's true, the
// //loop runs. After it finishes running, the last part runs, in this
// //case it's count++. It increments count, to change it's value, it's going to
// // go up. Now count is 1. it comes back to the middle, is one less than 3, yes
// // run the code, then go to count++, then back to the start. then go back
// // around. 0, 1 and 2 are the three things in your array, so you can use
// //them to get into the array. it's called 'walking an array'.

// for(var count = 0; count < colors.length; count++)
// {
//   console.log("You typed in color: " + colors[count]);
// }
// //let's go backwards! We have to start at 1 less than the number of things in
// //the array, as the first position in the array is 0. Its going to decrement
// //from 2 to zero instead of counting from 0 to 2.
// debugger;

// var sum = 0;
// for(var loop = colors.length - 1; loop > -1; loop--)
// {
//   // sum = 0;
//   sum += colors[loop].length;
// // can't put that in here as every time you loop you'll reset sum to zero
// //so you want to put it outside your loop.
// }
// var avg = sum / colors.length;

// // Anywhere in your code you want to add 1 to some number, just do ++
// // or subtract 1 from some number, do --. In these variables the words
// //count and loop are just variable names, you could have called them
// //anything.

