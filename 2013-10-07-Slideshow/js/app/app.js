'use strict';

var photos = [];
var currentIndex = 0;
var page = 1;
var timer = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
}

function searchFlickr(){
  var API_KEY = 'e537125f2a7afacf3bb817552513a66e';//we got this from flickr by creating our own app from the app garden or something.
  var PER_PAGE = 3;//we decide how many pics we'd like to see per page
  var query = $('#query').val();

  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);//in this case 'results' is a function we've named and will be created. It's a callback - it'll be called back once the data is retrieved from the line of code above.
  // console.log(url);
}

function results(data){
  photos = data.photos.photo;//photos is a global array we already set and JSON returned an array (singularly called photo) within data.photo
  timer = setInterval(createImage, 1000);
}

function createImage(photo){
  var photo = photos[currentIndex];//current index is zero which is the first pic in the array called 'photo'

  try//exception handling cos dealing with external services
  {
    var url = 'url(http://farm'+ photo.farm +'.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    var $div =  $('<div>');
    $div.addClass('photo');
    $div.css('background-image', url);
    $('#photos').prepend($div);

    if(currentIndex < photos.length - 1){
      currentIndex++;
    }else{
      clearInterval(timer);//stop the timer
      currentIndex = 0;
      page++;
      searchFlickr();
    }
  }
  catch(err)//you could console.log this error
  {//looks like we called flickr and it gave us no data so
    clearInterval(timer);//stop the timer
    currentIndex = 0;//reset the index
    searchFlickr();//call the function again(call flickr)
  }
}