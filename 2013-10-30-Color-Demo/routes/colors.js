
/*
 * GET /colors
 */

exports.index = function(req, res){
  var colors = ['blue', 'green', 'orange', 'olive', 'red'];
  res.render('colors/index', {title: 'Colors', colors: colors});//now our var colors is a property of our object so we can use it inside the view code being directed to from here.
};