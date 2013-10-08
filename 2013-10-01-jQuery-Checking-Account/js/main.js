var balance = 1000;

function withdraw(balance, amount){
  return balance - amount;
}

function deposit(balance, amount){
  return balance + amount;
}

$(document).ready(initialize);

function initialize()
{
  $('#withdraw').click(withdraw_from_balance);
  $('#deposit').click(deposit_to_balance);
}

function withdraw_from_balance(){
  var amount = $('#amount').val();
  amount = parseInt(amount);
  balance = withdraw(balance, amount);
  $('#balance').val('$' + balance + '.00');
  if(balance < 0){
    $('#balance').addClass('red');
  }
}

function deposit_to_balance(){
  var amount = $('#amount').val();
  amount = parseInt(amount);
  balance = deposit(balance, amount);
  $('#balance').val('$' + balance + '.00');
  if(balance > 0){
    $('#balance').removeClass('red');
  }
}






