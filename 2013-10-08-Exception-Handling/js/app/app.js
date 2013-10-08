'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  var o = {};

  try{
    console.log(y);
  } catch(e) {
    console.log('you just received the error:' + e);
  }

  try{//Always wrap unknowns in a try catch block, to prevent program blowing up.
  console.log(b);
  }catch(e) {
    console.log('you just received the error:' + e);
  }

  try{
    o.doesntExist();
  }catch(e){
    console.log('you just received the error:' + e);
  }

  console.log('I have reached the end of this function');
}
