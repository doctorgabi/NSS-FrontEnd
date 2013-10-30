var fs = require('fs');

//input todo.json
//output [p1, p2, p3]
//call example:
//var todo = database.read('todo.json')
exports.read = function(filename){
  var data = fs.readFileSync(filename);
  data = JSON.parse(data);
  return data;
};


//input todo.json, data
//output - nothing (just write this to the file and we're done)
//database.write('todo.json', [p1, p2, p3])
exports.write = function(filename, data){
  data = JSON.stringify(data);
  fs.writeFileSync(filename,data);
};