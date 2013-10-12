'use strict';

//Firebase Schema
var Δdb;
var Δstocks;
var ΔtotalStockValue;
var ΔavailableFunds;

//Local Schema
var db = {};
db.stocks = [];
db.availableFunds = 0;
db.totalStockValue = 0;


$(document).ready(initialize);
function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market-gse.firebaseio.com/');
  ΔtotalStockValue = Δdb.child('totalStockValue');
  ΔavailableFunds = Δdb.child('availableFunds');
  Δstocks = Δdb.child('stocks');
  $('#addFunds').click(addFunds);
  $('#buy').click(getStockQuote);
  Δstocks.on('child_added', createRow);
  ΔtotalStockValue.on('value', updateTotalStockValue);
  ΔavailableFunds.on('value', updateAvailableFunds);
}

//-----------------------------------------------------------------------//
//------------------------button clicks----------------------------------//
//-----------------------------------------------------------------------//

function addFunds(){//from event handler (click 'set funds')
  var Funds = $('#funds').val();
  if($('#availableFunds').val() === '$null'){
    $('#availableFunds').val('$0.00');
  }else if(!$('#availableFunds').val()){
    $('#availableFunds').val('$0.00');
  }
  var existingfunds = $('#availableFunds').val().slice(1);
  var availableFunds = parseFloat(Funds,10) + parseFloat(existingfunds,10);
  $('#availableFunds').val('$'+ availableFunds);
  db.availableFunds = availableFunds;
  ΔavailableFunds.set(db.availableFunds);
  $('#funds').val('');
}


function getStockQuote(){//from event handler (click 'buy')
  var data = {symbol: $('#symbol').val()};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, function(snapshot){
    var stock = {};
    var name = snapshot.Data.Name;
    var symbol = snapshot.Data.Symbol;
    var price = snapshot.Data.LastPrice;

    var total = price * parseInt($('#quantity').val(),10);

    if(total > (parseFloat($('#availableFunds').val().slice(1)))){
      alert('Insufficient funds');

    }else{
      stock.name = name;
      stock.symbol = symbol;
      stock.price = price;
      stock.quantity = parseInt($('#quantity').val(), 10);
      Δstocks.push(stock);
      spendAvailableFunds(total);
    }//end if/else

    $('#symbol').val('');
    $('#quantity').val('');


  });//end getJSON
}//end getStockQuote


//-----------------------------------------------------------------------//
//------------------------database events--------------------------------//
//-----------------------------------------------------------------------//

function updateAvailableFunds(funds){
  funds = funds.val();
  $('#availableFunds').val('$' + funds);
}

function updateTotalStockValue(funds){
  funds = funds.val();
  $('totalStockValue').val('$' + funds);
}


function createRow(stock){
  stock = stock.val();//this gets the data as an object you can then use!

  var row = '<tr><td class="name"></td><td class="symbol"></td><td class="quote"></td><td class="purchased"></td><td class="total"></td></tr>';
  var $row = $(row);
  var total = stock.price * stock.quantity;

  $row.children('.name').text(stock.name);
  $row.children('.symbol').text(stock.symbol);
  $row.children('.quote').text('$' + stock.price);
  $row.children('.purchased').text(stock.quantity);
  $row.children('.total').text('$' + total);

  $('#stocksTable').append($row);
}







//-----------------------------------------------------------------------//
//---------------------------updates monies------------------------------//
//-----------------------------------------------------------------------//

function spendAvailableFunds(total){
  var existingfunds = $('#availableFunds').val().slice(1);
  var availableFunds = parseFloat(existingfunds,10) - total;
  $('#availableFunds').val('');
  $('#availableFunds').val('$' + availableFunds);

  db.availableFunds = availableFunds;
  ΔavailableFunds.set(db.availableFunds);

  if($('#totalStockValue').val() === '$null'){
    $('#totalStockValue').val('$0.00');
  }else if(!$('#totalStockValue').val()){
    $('#totalStockValue').val('$0.00');
  }
  var existingTotal = $('#totalStockValue').val().slice(1);
  var totalStockValue = parseFloat(existingTotal,10) + total;

  db.totalStockValue = totalStockValue;
  ΔtotalStockValue.set(db.totalStockValue);//*******problem here, coming from the updateAvailableFunds function - it's making the available funds match the total spent
  $('#totalStockValue').val('$' + totalStockValue);
}


//-----------------------------------------------------------------------//
//-----------------------------------------------------------------------//
//-----------------------------------------------------------------------//