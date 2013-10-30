

exports.square = function(x){
  var sq = x * x;
  return sq;
};


exports.area = function(length, width){
  return length * width;
};

exports.volume = function(length, width, height){
  return this.area(length, width) * height;
};