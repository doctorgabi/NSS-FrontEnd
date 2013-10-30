'use strict';
// -------------------------------------------------------------------- //
// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;
// -------------------------------------------------------------------- //
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeSchema();
  initializeDatabase();
  turnHandlersOn();
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeSchema(){
  db.constants = {};
  db.constants.domesticShipping = 0.50;
  db.constants.internationalShipping = 1.50;

  db.products = [];
  db.customers = [];
  db.orders = [];

  db.pagination = {};
  db.pagination.perPage = 5;
  db.pagination.currentPage = 1;
  db.pagination.currentRowCount = 0;

  db.cart = new Cart();
}

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');

  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
  Δorders.on('child_added', dbOrderAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#add-customer').on('click', clickAddCustomer);
  $('#previous').on('click', clickNavigation);
  $('#next').on('click', clickNavigation);
  $('#products').on('click', 'img', clickAddItemToCart);
  $('#select-customer').on('change', changeCustomer);
  $('#purchase').on('click', clickPurchase);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#add-customer').off('click');
  $('#previous').off('click');
  $('#next').off('click');
  $('#products').off('click');
  $('#select-customer').off('change');
  $('#purchase').off('click');
}

// -------------------------------------------------------------------- //
// ----------------------click & change handlers----------------------- //
// -------------------------------------------------------------------- //
function clickPurchase(){
  var order = createOrderForFirebase();
  Δorders.push(order);

  //declare a variable that grabs all the stuff that's currently in the cart
  //needs to call 5 functions, 1 = clear the tbody of all rows
  $('#cart tbody tr').remove();
  //and the footer of all values:
  $('#cart tfoot td').text('');
  //2= select customer reset.
  $('select#select-customer').val('default');


//create a 'new' Order
//push it to Firebase
//when it comes down from the firebase, create it again then push it to the local db.

}

function clickAddProduct(){
  var image = getValue('#product-image');
  var name = getValue('#product-name');
  var weight = getValue('#product-weight', parseFloat);
  var price = getValue('#product-price', parseFloat);
  var off = getValue('#product-off', parseFloat) / 100;

  var product = new Product(image, name, weight, price, off);
  delete product.salePrice;
  Δproducts.push(product);
}

function clickAddCustomer(){
  var image = getValue('#customer-image');
  var name = getValue('#customer-name');
  var isDomestic = $('input[name="address"]:checked').val() === 'domestic';
  htmlResetRadioButtons();

  var customer = new Customer(image, name, isDomestic);
  Δcustomers.push(customer);
}

function clickNavigation(){
  db.pagination.currentRowCount = 0;
  htmlEmptyProductRows();

  var isPrevious = this.id === 'previous';
  db.pagination.currentPage += isPrevious ? -1 : +1;

  var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
  var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
  var isLess = startIndex > 0;
  var isMore = db.products.length > endLength;

  htmlShowHideNavigation('#previous', isLess);
  htmlShowHideNavigation('#next', isMore);

  for(var i = startIndex; i < endLength; i++){
    htmlAddProduct(db.products[i]);
  }
}

function clickAddItemToCart(){
  if(db.cart.customer){
    var name = $(this).parent().next().text();
    var product = _.find(db.products, function(p){return p.name === name;});
    db.cart.products.push(product);
    htmlAddItemToCart(product);
    htmlUpdateCartTotals();
  }
}

function changeCustomer(){
  var name = this.value;
  var customer = _.find(db.customers, function(c){return c.name === name;});
  db.cart.customer = customer;
}

// -------------------------------------------------------------------- //
// ------------------------------db updaters--------------------------- //
// -------------------------------------------------------------------- //

function dbOrderAdded(){
  var order = new Order();
}

function dbProductAdded(snapshot){
  var obj = snapshot.val();
  var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage){
    htmlAddProduct(product);
  } else {
    htmlShowHideNavigation('#next', true);
  }
}

function dbCustomerAdded(snapshot){
  var obj = snapshot.val();
  var customer = new Customer(obj.image, obj.name, obj.isDomestic);
  customer.id = snapshot.name();
  db.customers.push(customer);
  htmlAddCustomerToSelect(customer);
}

function dbOrderAdded(snapshot){
  var obj = snapshot.val();
}

// -------------------------------------------------------------------- //
// -------------------------html updaters------------------------------ //
// -------------------------------------------------------------------- //

function htmlAddProduct(product){
  db.pagination.currentRowCount++;
  var tr = '<tr class="product"><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight.toFixed(2) + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off.toFixed(2) + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
  var $tr = $(tr);
  $('#products').append($tr);
}

function htmlShowHideNavigation(selector, shouldShow){
  $(selector).removeClass('hidden');

  if(!shouldShow){
    $(selector).addClass('hidden');
  }
}

function htmlEmptyProductRows(){
  $('.product').remove();
}

function htmlResetRadioButtons(){
  $('input[name="address"]:checked')[0].checked = false;
}

function htmlAddCustomerToSelect(customer){
  var $option = $('<option>');
  $option.val(customer.name);
  $option.text(customer.name);
  $('#select-customer').prepend($option);
}

function htmlAddItemToCart(product){
  var count, $tr, tr;
  var $tds = $('#cart tbody .product-name');
  var foundTd = _.find($tds, function(td){return td.innerText === product.name;});

  if(foundTd){
    count = parseInt($(foundTd).next().text(), 10);
    count++;
    $tr = $(foundTd).parent();
  } else {
    count = 1;
    tr = '<tr><td class="product-name"></td><td class="product-count"></td><td class="product-amount"></td><td class="product-weight"></td><td class="product-shipping"></td><td class="product-grand"></td></tr>';
    $tr = $(tr);
    $('#cart tbody').append($tr);
  }

  var amount = product.salePrice() * count;
  var weight = product.weight * count;
  var shipping = weight * (db.cart.customer.isDomestic ? db.constants.domesticShipping : db.constants.internationalShipping);
  var grand = amount + shipping;

  $tr.children('.product-name').text(product.name);
  $tr.children('.product-count').text(count);
  $tr.children('.product-amount').text(formatCurrency(amount));
  $tr.children('.product-weight').text(weight.toFixed(2) + ' lbs');
  $tr.children('.product-shipping').text(formatCurrency(shipping));
  $tr.children('.product-grand').text(formatCurrency(grand));
}

function htmlUpdateCartTotals(){
  $('#cart-count').text(db.cart.totals.count());
  $('#cart-amount').text(formatCurrency(db.cart.totals.amount()));
  $('#cart-weight').text(db.cart.totals.weight().toFixed(2) + ' lbs');
  $('#cart-shipping').text(formatCurrency(db.cart.totals.shipping()));
  $('#cart-grand').text(formatCurrency(db.cart.totals.grand()));
}

// -------------------------------------------------------------------- //
// ----------------------------Constructors---------------------------- //
// -------------------------------------------------------------------- //
function createOrderForFirebase(){
  var order = {};
  order.products = [];
  for(var i = 0; i < db.cart.products.length; i++){
    var product = {};
    product.name = db.cart.products[i].name;
    product.weight = db.cart.products[i].weight;
    product.price = db.cart.products[i].price;
    product.off = db.cart.products[i].off;
    order.products.push(product);
  }
  order.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  order.customer = db.cart.customer.name;
  order.total = db.cart.totals.amount();
  order.weight = db.cart.totals.weight();
  order.shipping = db.cart.totals.shipping();
  order.grand = db.cart.totals.grand();
  return order;
}


function Order(){
  debugger;
  this.time = //get time from firebase object//moment().format('MMMM Do YYYY, h:mm:ss a');
  this.customer = db.cart.customer.name;
  this.products = db.cart.products;
  this.total = db.cart.totals.amount();
  this.weight = db.cart.totals.weight();
  this.shipping = db.cart.totals.shipping();
  this.grand = db.cart.totals.grand();
}

function Product(image, name, weight, price, off){
  this.image = image;
  this.name = name;
  this.weight = weight;
  this.price = price;
  this.off = off;
  this.salePrice = function(){return this.price - (this.price * this.off);};
}

function Customer(image, name, isDomestic){
  this.image = image;
  this.name = name;
  this.isDomestic = isDomestic;
}

function Cart(){
  var save = this;
  this.customer = null;
  this.products = [];
  this.totals = {};
  this.totals.count = function(){return save.products.length;};
  this.totals.amount = function(){return _.reduce(save.products, function(memo, product){return memo + product.salePrice();}, 0);};
  this.totals.weight = function(){return _.reduce(save.products, function(memo, product){return memo + product.weight;}, 0);};
  this.totals.shipping = function(){return this.weight() * (save.customer.isDomestic ? db.constants.domesticShipping : db.constants.internationalShipping);};
  this.totals.grand = function(){return this.amount() + this.shipping();};
}

// -------------------------------------------------------------------- //
// -------------------------Miscellaneous------------------------------ //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //



// 'use strict';

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// // Firebase Schema
// var Δdb;
// var Δproducts;
// var Δcustomers;
// var Δorders;

// // Local Schema (defined in keys.js)
// db.products = db.customers = db.orders = [];
// db.pagination = {};
// db.pagination.perPage = 5;
// db.pagination.currentPage = 1;
// db.pagination.currentRowCount = 0;
// db.cart = {};
// db.cart.products = [];
// db.cart.totals = {};
// db.cart.totals.price = 0;
// db.cart.totals.quantity = 0;
// db.cart.totals.weight = 0;
// db.cart.totals.shipping = 0;
// db.cart.totals.grandTotal = 0;


// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// $(document).ready(initialize);

// function initialize(){
//   $(document).foundation();
//   initializeDatabase();
//   turnHandlersOn();
// }

// // -------------------------------------------------------------------- //
// // ------------------------initialize---------------------------------- //
// // -------------------------------------------------------------------- //

// function initializeDatabase(){
//   Δdb = new Firebase(db.keys.firebase);
//   Δproducts = Δdb.child('products');
//   Δcustomers = Δdb.child('customers');
//   Δorders = Δdb.child('orders');

//   Δproducts.on('child_added', dbProductAdded);
//   Δcustomers.on('child_added', dbCustomerAdded);
//   Δorders.on('child_added', dbOrderAdded);
// }

// function turnHandlersOn(){
//   $('#add-product').on('click', clickAddProduct);
//   $('#previous').on('click', clickNavigation);
//   $('#next').on('click', clickNavigation);
//   $('#addCustomer').on('click', clickAddCustomer);
//   $('#selectCustomer').on('change', changeCustomer);
//   $('#products tbody').on('click', '.product-image', clickAddToCart);
// }

// function turnHandlersOff(){
//   $('#add-product').off('click');
//   $('#previous').off('click');
//   $('#next').off('click');
//   $('#addCustomer').off('click');
//   $('#selectCustomer').off('change');
//   $('#products tbody').off('click', '.product-image');
// }

// // -------------------------------------------------------------------- //
// // ----------------------click handlers-------------------------------- //
// // -------------------------------------------------------------------- //

// function clickAddToCart(){
//   db.cart.totals.quantity += 1;
//   var name = $(this).parent().children('.product-name').text();
//   var product = _.find(db.products, function(p){return p.name === name;});
//   db.cart.products.push(product);
//   var multiplier = addMultiplesToCart(name);

//   var price = product.price;
//   var off = product.off;
//   var salePrice = (price - (price * off)) * multiplier;

//   var shipping = calculateShipping(product) * multiplier;
//   var weight = product.weight * multiplier;
//   var total = salePrice + shipping;

//   if(multiplier > 1){
//     htmlUpdateCartItem(name, multiplier, salePrice, weight, shipping, total);
//   }else{
//     htmlAddNewCartItem(name, multiplier, salePrice, weight, shipping, total);
//   }

//   salePrice /= multiplier;
//   weight /= multiplier;
//   shipping /= multiplier;
//   total /= multiplier;

//   dbUpdateCart(salePrice, weight, shipping, total);
//   htmlUpdateFooter();
// }

// function clickAddCustomer(){
//   var name = getValue('#customerName');
//   var image = getValue('#customerImage');
//   var isDomestic = $('#domestic')[0].checked;
//   var customer = new Customer(name, image, isDomestic);
//   Δcustomers.push(customer);
//   htmlResetRadioButtons();
// }

// function clickAddProduct(){
//   var image = getValue('#product-image');
//   var name = getValue('#product-name');
//   var weight = getValue('#product-weight', parseFloat);
//   var price = getValue('#product-price', parseFloat);
//   var off = getValue('#product-off', parseFloat) / 100;

//   var product = new Product(image, name, weight, price, off);
//   delete product.salePrice;
//   Δproducts.push(product);
// }

// function clickNavigation(){
//   db.pagination.currentRowCount = 0;
//   htmlEmptyProductRows();

//   var isPrevious = this.id === 'previous';
//   db.pagination.currentPage += isPrevious ? -1 : +1;

//   var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
//   var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
//   var isLess = startIndex > 0;
//   var isMore = db.products.length > endLength;

//   htmlShowHideNavigation('#previous', isLess);
//   htmlShowHideNavigation('#next', isMore);

//   for(var i = startIndex; i < endLength; i++){
//     htmlAddProduct(db.products[i]);
//   }
// }
// // -------------------------------------------------------------------- //
// // ----------------------change handlers-------------------------------- //
// // -------------------------------------------------------------------- //

// function changeCustomer(){
//   var name = this.value;
//   var customer = _.find(db.customers, function(c){return c.name === name;});
//   db.cart.customer = customer;
//   db.cart.isDomestic = customer.isDomestic;
// }

// // -------------------------------------------------------------------- //
// // ------------------database change notificiations-------------------- //
// // -------------------------------------------------------------------- //

// function dbProductAdded(snapshot){
//   var obj = snapshot.val();
//   var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
//   product.id = snapshot.name();
//   db.products.push(product);
//   if(db.pagination.currentRowCount < db.pagination.perPage){
//     htmlAddProduct(product);
//   } else {
//     htmlShowHideNavigation('#next', true);
//   }
// }

// function dbCustomerAdded(snapshot){
//   var obj = snapshot.val();
//   var customer = new Customer(obj.name, obj.image, obj.isDomestic);
//   customer.id = snapshot.name();
//   db.customers.push(customer);
//   htmlAddCustomerToSelect(customer);
// }

// function dbOrderAdded(snapshot){
//   var order = snapshot.val();
// }

// // -------------------------------------------------------------------- //
// // -----------------------html updates--------------------------------- //
// // -------------------------------------------------------------------- //

// function htmlUpdateFooter(){
//   $('tfoot > tr').remove();
//   var $tr = $('<tr><td>Totals:</td><td id="totalQuantity">'+ db.cart.totals.quantity +'</td><td id="totalPrice">'+ formatCurrency(db.cart.totals.price) +'</td><td id="totalWeight">'+ db.cart.totals.weight +' lbs </td><td id="totalShipping">'+ formatCurrency(db.cart.totals.shipping) +'</td><td id="GrandTotal">'+ formatCurrency(db.cart.totals.grandTotal) +'</td></tr>');
//   $('tfoot').append($tr);
// }

// function htmlAddNewCartItem(name, multiplier, salePrice, weight, shipping, total){
//   var $tr = $('<tr><td class="cartName">'+ name +'</td><td class="cartQuantity">'+ multiplier +'</td><td class="cartAmount">'+ formatCurrency(salePrice) +'</td><td class="cartWeight">'+ weight +' lbs </td><td class="cartShipping">'+ formatCurrency(shipping) +'</td><td class="cartTotal">'+ formatCurrency(total) +'</td></tr>');
//   $('#cartBody').append($tr);
// }

// function htmlUpdateCartItem(name, multiplier, salePrice, weight, shipping, total){
//   // debugger;
//   // $('')

//   //product already exists - write some code to search the table
//     //and change the values
// }


// function htmlAddCustomerToSelect(customer){
//   console.log(customer);
//   var $option = $('<option>');
//   $option.text(customer.name);
//   $option.val(customer.name);
//   $('#selectCustomer').prepend($option);
// }

// function htmlAddProduct(product){
//   db.pagination.currentRowCount++;
//   var tr = '<tr class="product"><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
//   var $tr = $(tr);
//   $('#products').append($tr);
// }

// function htmlShowHideNavigation(selector, shouldShow){
//   $(selector).removeClass('hidden');

//   if(!shouldShow){
//     $(selector).addClass('hidden');
//   }
// }

// function htmlResetRadioButtons(){
//   $('input[name="address"]').each(function(index, dom){
//     dom.checked = false;
//   });
// }

// function htmlEmptyProductRows(){
//   $('.product').remove();
// }

// // -------------------------------------------------------------------- //
// // ----------------------Local Database Updates------------------------ //
// // -------------------------------------------------------------------- //

// function dbUpdateCart(salePrice, weight, shipping, total){
//   db.cart.totals.price += salePrice;
//   db.cart.totals.weight += weight;
//   db.cart.totals.shipping += shipping;
//   db.cart.totals.grandTotal += total;
// }

// // -------------------------------------------------------------------- //
// // ---------------------------Constructors----------------------------- //
// // -------------------------------------------------------------------- //
// function Customer(name, image, isDomestic){
//   this.name = name;
//   this.image = image;
//   this.isDomestic = isDomestic;
// }

// function Product(image, name, weight, price, off){
//   this.image = image;
//   this.name = name;
//   this.weight = weight;
//   this.price = price;
//   this.off = off;
//   this.salePrice = function(){return this.price - (this.price * this.off);};
// }

// // -------------------------------------------------------------------- //
// // --------------------------Miscellaneous----------------------------- //
// // -------------------------------------------------------------------- //
// function addMultiplesToCart(name){
//   var x = _.filter(db.cart.products, function(product){return product.name === name});
//   return x.length;
// }

// function calculateShipping(product){
//   var costPerPound = 0;
//   if(db.cart.isDomestic){
//     costPerPound = 0.50;
//   }else{
//     costPerPound = 1.50;
//   }
//   return costPerPound * product.weight;
// }


// function getValue(selector, fn){
//   var value = $(selector).val();
//   value = value.trim();
//   $(selector).val('');

//   if(fn){
//     value = fn(value);
//   }

//   return value;
// }

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //





// // 'use strict';

// // // -------------------------------------------------------------------- //
// // // ----------------Previous work in progress versions...--------------- //
// // // -------------------------------------------------------------------- //

// // // Firebase Schema
// // var Δdb;
// // var Δproducts;
// // var Δcustomers;
// // var Δorders;

// // // Local Schema (defined in keys.js)
// // db.products = db.customers = db.orders = [];
// // db.pagination = {};
// // db.pagination.perPage = 5;
// // db.pagination.currentPage = 1;//add or subtract 1 from this when next or previous buttons are clicked.
// // db.pagination.currentRowCount = 0;

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // $(document).ready(initialize);

// // function initialize(fn, flag){
// //   $(document).foundation();
// //   initializeDatabase();
// //   turnHandlersOn();
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function initializeDatabase(){
// //   Δdb = new Firebase(db.keys.firebase);
// //   Δproducts = Δdb.child('products');
// //   Δcustomers = Δdb.child('customers');
// //   Δorders = Δdb.child('orders');

// //   Δproducts.on('child_added', dbProductAdded);
// //   Δcustomers.on('child_added', dbCustomerAdded);
// //   Δorders.on('child_added', dbOrderAdded);
// // }

// // function turnHandlersOn(){
// //   $('#add-product').on('click', clickAddProduct);
// //   $('#previous').on('click', clickPrevious);
// //   $('#next').on('click', clickNext);
// // }

// // function turnHandlersOff(){
// //   $('#add-product').off('click');
// //   $('#previous').off('click');
// //   $('#next').off('click');
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function clickAddProduct(){
// //   var image = getValue('#product-image');
// //   var name = getValue('#product-name');
// //   var weight = getValue('#product-weight', parseFloat);
// //   var price = getValue('#product-price', parseFloat);
// //   var off = getValue('#product-off', parseFloat) / 100;

// //   var product = new Product(image, name, weight, price, off);
// //   delete product.salePrice;
// //   Δproducts.push(product);
// // }

// // function clickNext(){
// //   debugger;
// //   htmlEmptyProductRows();

// //   var startIndex = db.pagination.perPage * db.pagination.currentPage;
// //   for(var i = startIndex; i < startIndex+5; i++){
// //     htmlAddProduct(i);
// //   }
// //   db.pagination.currentPage += 1;
// // }

// // function clickPrevious(){
// //   console.log('the click handler works');
// // }
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function dbProductAdded(snapshot){
// //   var obj = snapshot.val();
// //   var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
// //   product.id = snapshot.name();
// //   db.products.push(product);
// //   if(db.pagination.currentRowCount < db.pagination.perPage){
// //     htmlAddProduct(product);
// //   }else{
// //     htmlShowNextButton();
// //   }
// // }

// // function dbCustomerAdded(snapshot){
// //   var customer = snapshot.val();
// // }

// // function dbOrderAdded(snapshot){
// //   var order = snapshot.val();
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function htmlAddProduct(product){
// //   var tr = '<tr><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
// //   var $tr = tr;
// //   $('#products').append($tr);
// //   db.pagination.currentRowCount += 1;
// // }

// // function htmlShowNextButton(){
// //   if($('#next').hasClass('hidden')){
// //     $('#next').removeClass('hidden');
// //   }
// // }

// // function htmlEmptyProductRows(){
// //   var title = $('#products #title').detach();//make a variable that's the first row & chop it off
// //   $('#products').empty();//empty the table
// //   $('#products').append(title); //reattach the title row
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function Product(image, name, weight, price, off){
// //   this.image = image;
// //   this.name = name;
// //   this.weight = weight;
// //   this.price = price;
// //   this.off = off;
// //   this.salePrice = function(){return this.price - (this.price * this.off);};
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function getValue(selector, fn){
// //   var value = $(selector).val();
// //   value = value.trim();
// //   $(selector).val('');

// //   if(fn){
// //     value = fn(value);
// //   }

// //   return value;
// // }

// // function parseUpperCase(string){
// //   return string.toUpperCase();
// // }

// // function parseLowerCase(string){
// //   return string.toLowerCase();
// // }

// // function formatCurrency(number){
// //   return '$' + number.toFixed(2);
// // }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// // 'use strict';

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // // Firebase Schema
// // var Δdb;
// // var Δproducts;
// // // var Δcustomers;
// // // var Δorders;
// // // Local Schema (defined in keys.js)
// // db.products = db.customers = db.orders = [];
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // $(document).ready(initialize);

// // function initialize(){
// //   $(document).foundation();
// //   initializeDatabase();
// //   turnHandlersOn();
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function initializeDatabase(){
// //   Δdb = new Firebase(db.keys.firebase);
// //   Δproducts = Δdb.child('products');
// //   Δcustomers = Δdb.child('customers');
// //   Δorders = Δdb.child('orders');
// // }

// // function turnHandlersOn(){
// //   $('#add-product').on('click', clickAddProduct);
// //   Δproducts.on('child_added', updateProductsDb);
// //   // Δcustomers.on('child_added', updateCustomersDb);
// //   // Δorders.on('child_added', updateOrderssDb);
// // }

// // function turnHandlersOff(){
// //   $('#add-product').off('click');
// //   Δproducts.off('child_added');
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function clickAddProduct(){
// //   var product = new Product();
// //   delete product.salePrice;
// //   Δproducts.push(product);
// // }

// // function Product(){
// //   this.productImage = getValue($('#product-image'));
// //   this.productName = getValue($('#product-name'));
// //   this.productPrice = parseFloat($('#product-price').val());
// //   this.productOff = parseFloat($('#product-off').val());
// //   this.productWeight = parseFloat($('#product-weight').val());
// //   this.salePrice = formatCurrency(this.productPrice - (this.productPrice*(this.productOff/100)));
// // }

// // function updateProductsDb(snapshot){
// //   debugger;
// //   var product = snapshot.val();
// //   product.id = snapshot.name();
// //   db.products.push(product);
// //   htmlUpdateTable(product);
// //   turnHandlersOff();
// // }

// // function htmlUpdateTable(product){
// //   var tr = $('<tr><td class="name">'+product.productName +'</td><td><img class="image" src="' +product.productImage+ '"></td><td class="weight">' + product.productWeight + '</td><td class="price">' + product.productPrice + '</td><td class="off">' + product.productOff + '</td><td class="sale">' + product.salePrice + '</td></tr>');
// //   var $tr = tr;

// //   $('#products').append($tr);
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //

// // function getValue(selector, fn){
// //   var value = $(selector).val();
// //   value = value.trim();
// //   $(selector).val('');

// //   if(fn){
// //     value = fn(value);
// //   }

// //   return value;
// // }

// // function formatCurrency(number){
// //   return '$' + number.toFixed(2);
// // }

// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
// // // -------------------------------------------------------------------- //
