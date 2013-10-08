'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#photos').on('dblclick', '.photo', remove);
  $('#photos').on('click', '.photo', selected);
  $('#clear').click(removeAll);
  $('#delete').click(deleteSelection);
  $('#save').click(saveSelection);
}

function saveSelection(){
  var $selectedImages = $('.selected');
  $selectedImages.removeClass('selected');
  $('#saved-photos').prepend($selectedImages);
}

function deleteSelection(){
  $('.selected').remove();
}

function selected(){
  $(this).toggleClass('selected');
}

function removeAll(){
  $('#photos').empty();
}

function remove(){
  var $photoToRemove = $(this);
  $photoToRemove.remove();
}

function searchFlickr(){
  var API_KEY = 'e537125f2a7afacf3bb817552513a66e';//we got this from flickr by creating our own app from the app garden or something.
  var PER_PAGE = 10;//we decide how many pics we'd like to see per page
  var page = 1;//this is set as the first page of the results
  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);//in this case 'results' is a function we've named and will be created. It's a callback - it'll be called back once the data is ready.
}

function results(data){
  for(var i = 0; i < data.photos.photo.length; i++){
    createImage(data.photos.photo[i]);
  }
}

function createImage(photo){
  var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
  var $div =  $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#photos').prepend($div);
}