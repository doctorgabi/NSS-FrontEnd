
var points = [];


for(var i = 0; i < 2; i++)
{
  var p = {};//declare it here so it resets after each iteration
  //and it's already pushed to the array at the end of the loop
  //so it's ok to reset it every time. It's really a temporary variable
  // and we can always still access the previous p's by calling the array
  //index, such as "points[2]" is the 3rd p value in the array.
  //points[2].y will be the y value in the 3rd object in the array.
  p.x = parseInt(prompt('Enter position x'));
  p.y = parseInt(prompt('Enter position y'));
  points.push(p);
}

// debugger;

var Asq = Math.pow((points[0].y)-(points[1].y),2);//accesses the index of the object in the array
var Bsq = Math.pow((points[0].x)-(points[1].x),2);
var distance = Math.sqrt(Asq+Bsq);

