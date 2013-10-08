// // function square(x);
// // {
// //   var sq = x*x;
// //   return sq; //without the return there's no output, it'd be undefined.
// // }

// //alternatively you could write this as

// function square(x)
// {
//   return x*x;
// }

// function cube(x)
// {
//   //return Math.pow(x, 3) could do this, or use our old function:
//   return square(x) * x;
// }

// function area_rectangle(width, height)
// {
//   return width * height;
// }

// function area_square(side)
// {
//   return square(side);
// }

// function area_triangle(width, height)
// {
//   return (area_rectangle(width, height)) / 2;
// }

// function area_circle(radius)
// {
//   return Math.PI * radius * radius;
// }

// function cuft_to_gallons(cubic_ft)
// {
//   return (7.48052) * cubic_ft;
// }

// function volume_cylinder(radius, depth)
// {
//   return area_circle(radius) * depth;
// }

// var diameter = 30;
// var depth = 9;
// var gallons = cuft_to_gallons(volume_cylinder(diameter/2, depth));

// console.log('You have ' + gallons + ' gallons of water in your pool');


var rooms = [];



var add_room = 'y'

while(add_room =='y')
{
  var room = {};
  room.name = prompt("What is the name of the room?");
  room.L = parseInt(prompt("What length room (ft)?"));
  room.W = parseInt(prompt("What width room (ft)?"));
  room.windows = parseInt(prompt("How many windows?"));
  rooms.push(room);
  add_room = prompt("Do you want to build a room (y or n)?");
}

var total_rooms = rooms.length;

var total_windows = 0;
for(var i = 0; i < rooms.length; i++)
  total_windows+=rooms[i].windows;

var windows_cost = total_windows*250

function area(L, W)
{
  return L * W;
}

debugger;

var total_area = 0;

for(i = 0; i < rooms.length; i++)
{
  total_area += area(rooms[i].L, rooms[i].W);
}

var rooms_cost = total_area * 200;

var house_cost = rooms_cost + windows_cost;
console.log("The total cost to build the rooms is $" + rooms_cost);

console.log("The total cost of windows is $" + windows_cost);

console.log("The total cost to build the house is $" + house_cost);










