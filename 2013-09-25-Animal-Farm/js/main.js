var dogs = [];

var name = prompt("Enter a dogs name or blank to exit:")


while(name)
  //needs a boolean true first in the while()
{
  var dog = {};
  //creates an object called dog
  dog.name = name;
  dog.age = parseInt(prompt("Age?"));
  //age is now a property of the dog object, and it's parsed
  //from string to number, working from inside () to out.
  dog.breed = prompt("Breed?");
  //so far the dog has 3 properties, now we want to put him in the array
  dogs.push(dog);
  //to stop an infinite loop we have to chane 'name'
  name = prompt("Enter a dogs name of blank to exit?");
}

//to find the average age of your dogs:

// debugger;

var avg_age;
var sum_age = 0;

for (var i = 0; i < dogs.length; i++)
  sum_age+= dogs[i].age;

avg_age = sum_age/dogs.length;
console.log('You have ' + dogs.length + ' dogs, the average age is ' + Math.ceil(avg_age));
