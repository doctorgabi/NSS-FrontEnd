'use strict';

var Δdb;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-plots-gse.firebaseio.com/');
  $('#addFunds').click(addFunds);
  $('#buy').click(buy);
}


//-------------------------------------------------------------------------//
//--------------------------button click events----------------------------//
//-------------------------------------------------------------------------//

function addFunds(){
  var cash = parseInt($('#cash').val().slice(1), 10);
  if(!$('#cash').val()){
    cash = 0;
  }else if(cash === isNaN){
    cash = 0;
  }
  var funds = parseInt($('#funds').val(), 10);
  cash += funds;
  $('#cash').val('$' + cash);
  $('#funds').val('');
}

function buy(){
  var symbol = $('#symbol').val().toUpperCase();
  // var quantity = parseInt($('#quantity').val(),10);
  getQuote(symbol, function(data, textStatus, jqXHR){
    var quote = data.Data;
    console.log(quote);
    // var price = data.LastPrice;
    // var cost = price * quantity;
    // console.log(cost);
  });
}





//-------------------------------------------------------------------------//
//--------------------------getting stock quotes---------------------------//
//-------------------------------------------------------------------------//


function getQuote(symbol, fn){
  debugger;
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', symbol, fn);
}




//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//

//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//

//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//
//-------------------------------------------------------------------------//

