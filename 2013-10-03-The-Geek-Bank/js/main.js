'use strict';

$(document).ready(initialize);
var accountBalance = 0;

$('#balance').text('Balance: $' + accountBalance + '.00');
$('#imageURL').focus();

function initialize(){
  $('#setLogo').click(setTheLogo);
  $('#setBalance').click(setTheBalance);
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
  $('#depositTransaction ul').on('click', '.depositValue', undoDeposit);
  $('#withdrawalTransaction ul').on('click', '.withdrawalValue', undoWithdrawal);
}

function setTheLogo(){
  var $url = $('#imageURL').val();
  var $Logo = $('<img src=\"' + $url + '\">');
  $Logo.addClass('logo');
  $('#imageHolder').append($Logo);
  $('#imageURL').hide();
  $('#setLogo').hide();
  $('#inputBalanceAmount').focus();
}

function setTheBalance(){
  var $balanceInput = parseInt($('#inputBalanceAmount').val(), 10);
  accountBalance = $balanceInput;
  $('#balance').text('Balance: $' + accountBalance + '.00');
  $('#balanceSetter').hide();
  $('#amount').focus();
}

function deposit(){
  var $depositAmount = parseInt($('#amount').val(), 10);
  accountBalance += $depositAmount;
  $('#balance').text('Balance: $' + accountBalance + '.00');//updateDisplay(); would do this more elegantly
  var $depositList = $('<li>');
  $depositList.addClass('depositValue');
  $depositList.text('$' + $depositAmount + '.00');
  $('#depositTransaction > ul').prepend($depositList);
  $('#amount').val('');
  $('#amount').focus();
}

function withdraw(){
  var $withdrawalAmount = parseInt($('#amount').val(), 10);
  accountBalance -= $withdrawalAmount;
  $('#balance').text('Balance: $' + accountBalance + '.00');
  var $withdrawalList = $('<li>');
  $withdrawalList.addClass('withdrawalValue');
  $withdrawalList.text('$' + $withdrawalAmount + '.00');
  $('#withdrawalTransaction > ul').prepend($withdrawalList);
  $('#amount').val('');
  $('#amount').focus();
}

function undoDeposit(){
  var undoDepositAmount = parseInt($(this).text().slice(1), 10);
  accountBalance -= undoDepositAmount;
  $('#balance').text('Balance: $' + accountBalance + '.00');
  $(this).remove();
}

function undoWithdrawal(){
  var undoWithdrawalAmount = parseInt($(this).text().slice(1), 10);
  accountBalance += undoWithdrawalAmount;
  $('#balance').text('Balance: $' + accountBalance + '.00');
  $(this).remove();
}