$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('#authentication-button').on('click', clickAuthButton);
  $('#register').on('click', clickRegister);
  $('#login').on('click', clickLogin);
}

function initializeSocketIO(){
  var port = location.port ? location.port : '80';
  var url = location.protocol + '//' + location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}
//----------------------------[click handlers]-------------------------------------//

function clickAuthButton(e){
  $('form#authentication').toggleClass('hidden');
  $('input[name="email"]').focus();
  e.preventDefault();//will stop the default behaviour of that hyperlink - it won't follow the hyperlink
}

function clickRegister(e){
  var url = '/users';
  var data = $('form#authentication').serialize();//quickly grab the whole form using serialize
  sendAjaxRequest(url, data, 'post', null, e, function(data){
    htmlRegisterComplete(data);
  });//brought in from 'utilities file'. there's already a prevent default in there.
}

function clickLogin(e){
  var url = '/login';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    console.log(data);
  });
}
//----------------------------[html updaters]-------------------------------------//
function htmlRegisterComplete(result){
  $('#input[name="email"]').val('');
  $('#input[name="password"]').val('');

  if(result.status === 'ok'){
    $('form#authentication').toggleClass('hidden');
  }
}


//clear the email and the password but




//--------------------------------------------------------------------------------//