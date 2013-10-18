'use strict';

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)){return;}//this will stop the initialize function running multiple times and making the tests go crazy

  $(document).foundation();
  $('#calculate').click(clickCalculate);
  $('#history').on('click', '.button', clickRemoveLi);
  $('#sum').click(clickSum);
  $('#product').click(clickProduct);
  $('#negative').click(clickNegative);
  // $('#negative').click(clickPositive);
}

var resultsHistory = [];

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickCalculate(){
  var op1 = parseFloat($('#op1').val());
  var op2 = parseFloat($('#op2').val());
  var operator = $('#operator').val();
  var computation = op1+operator+op2;
  var result = eval(computation);

  $('#op1').val('');
  $('#op2').val('');
  $('#operator').val('');

  resultsHistory.push(result);
  htmlUpdateResult(result);
  htmlUpdateHistory(op1, op2, operator, result);
}

function clickRemoveLi(){
  $(this).parent().remove();
}

function clickSum(){
  var sum = 0;
  for(var i = 0; i < resultsHistory.length; i++){
    sum += resultsHistory[i];
  }
  $('#sumResult').val(sum);
}

function clickNegative(){
  // debugger;
  for(var i = 1; i < $('#history > li').length; i++){
    if($('#history > li:nth-child(i) > .result').val() < 0){
      $(this).parent().remove();
      resultsHistory.remove($(this).val());
    }//end if
  }//end for
}

// function clickPositive(){
//   debugger;
//   for(var i = 0; i < $('#history > li').length; i++){
//     if($('#history > li:nth-child(i) > #result').val() > 0){
//       $(this).parent().remove();
//       resultsHistory.remove($(this).val());
//     }//end if
//   }//end for
// }

function clickProduct(){
  var product = 1;//if you start it at zero everything you multiply will be zero!
  for(var i = 0; i < resultsHistory.length; i++){
  product *= resultsHistory[i];
  }
  $('#productResult').val(product);
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //


function htmlUpdateResult(result){
  $('#result').text(result);
}

function htmlUpdateHistory(op1, op2, operator, result){

  var $li = $('<li></li>');
  var $op1 = $('<span class="op1"></span>');
  var $operator = $('<span class="operator"></span>');
  var $op2 = $('<span class="op2"></span>');
  var $result = $('<span class="result"></span>');
  var $remove = $('<input type="button" value="X" class="remove button small radius alert"></input>');

  $op1.text(op1 + ' ');
  $operator.text(operator + ' ');
  $op2.text(op2 + ' = ');
  $result.text(result);

  $li.append($op1);
  $li.append($operator);
  $li.append($op2);
  $li.append($result);
  $li.append($remove);

  $('#history').prepend($li);
  $('#op1').focus();
}


function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}