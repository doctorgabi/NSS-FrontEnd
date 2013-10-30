'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  initializeSchema();
  Δdb.remove();
}

function teardownTest(){
}

test('Add Product', function(){
  expect(11);

  $('#product-image').val('ipad-air.png');
  $('#product-name').val('Ipad Air');
  $('#product-weight').val('1.0');
  $('#product-price').val('500.00');
  $('#product-off').val('10');
  $('#add-product').trigger('click');

  equal(db.products.length, 1, 'products array should have 1 element');
  ok(db.products[0].id, 'id should be populated');
  ok(db.products[0] instanceof Product, 'product should be an instanceof Product');
  equal(db.products[0].image, 'ipad-air.png', 'product should have an image');
  equal(db.products[0].name, 'Ipad Air', 'product should have a name');
  equal(db.products[0].weight, 1.0, 'product should have a weight');
  //QUnit.close(db.products[0].salePrice(), 450, 0.01, 'product should have a sale price');

  equal($('#products tr').length, 2, 'should be 2 rows in table');
  equal($('#products tr:nth-child(2) > td').length, 6, 'should be 6 columns in row');
  equal($('#products .product-name').text(), 'Ipad Air', 'name column should be populated');
  equal($('#products .product-sale').text(), '$450.00', 'sale column should be populated');
  equal($('#products .product-image img').attr('src'), '/img/ipad-air.png', 'image column should be populated');
});

test('Product Pagination', function(){
  expect(18);

  for(var i = 0; i < 12; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var off = Math.random() * 100;

    createTestProduct(name, image, weight, price, off);
  }

  equal(db.products.length, 12, 'should have 12 products');
  equal(db.pagination.perPage, 5, 'should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous.hidden').length, 1, 'previous button should be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('#products tr').length, 3, 'should have 2 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next.hidden').length, 1, 'next button should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  ok($('#previous').hasClass('hidden'), 'previous button should be hidden');
  ok(!$('#next').hasClass('hidden'), 'next button should not be hidden');
});

test('Add Customer', function(){
  expect(7);

  $('#customer-image').val('bob.png');
  $('#customer-name').val('Bob Jenkins');
  $('#domestic')[0].checked = true;
  $('#add-customer').trigger('click');

  equal(db.customers.length, 1, 'should have 1 customer in array');
  ok(db.customers[0] instanceof Customer, 'should be an instance of Customer');
  equal(db.customers[0].name, 'Bob Jenkins', 'name should be present');
  equal(db.customers[0].image, 'bob.png', 'image should be present');
  ok(db.customers[0].id, 'id should be present');
  ok(db.customers[0].isDomestic, 'should be domestic');

  ok(!$('#domestic')[0].checked, 'domestic should not be checked');
});

test('Customer DropDown and Shopping Cart', function(){
  expect(7);

  for(var i = 0; i < 5; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0];

    createTestCustomer(name, image, isDomestic);
  }

  createTestCustomer('Bob', 'bob.png', true);

  // table headers
  // name, count, amount, weight, shipping, total

  equal(db.customers.length, 6, 'should have 6 customers');
  equal($('select#select-customer option').length, 7, 'should have 7 option tags');
  equal($('select#select-customer option:nth-child(1)').val(), 'Bob', 'bob value should be on top of the list');
  equal($('select#select-customer option:nth-child(1)').text(), 'Bob', 'bob text should be on top of the list');
  ok($('table#cart').length, 'shopping cart should be visible');
  equal($('table#cart th').length, 6, 'should be 6 columns');
  ok($('#purchase').length, 'purchase button should be visible');
});

test('Add Items to Shopping Cart', function(){
  expect(19);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); // sale - 450
  createTestProduct('iPhone 5s', 'iphone-5s.png', 0.5, 200, 0); // sale - 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); // sale - 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally');
  $('select#select-customer').trigger('change');

  // 2 iphone 5s
  $('#products tr:nth-child(3) .product-image img').trigger('click');
  $('#products tr:nth-child(3) .product-image img').trigger('click');

  // 1 ipad air
  $('#products tr:nth-child(2) .product-image img').trigger('click');

  // 1 apple tv
  $('#products tr:nth-child(4) .product-image img').trigger('click');

  equal(db.cart.customer.name, 'Sally', 'shopping cart should belong to sally');
  ok(db.cart.customer instanceof Customer, 'sally should be a Customer');
  equal(db.cart.products.length, 4, 'should be 4 items in shopping cart');
  ok(db.cart.products[0] instanceof Product, 'item in products should be a Product');
  equal(db.cart.totals.count(), 4, 'should have choosen 4 items');
  equal(db.cart.totals.amount(), 945, 'amount total should be 945');
  equal(db.cart.totals.weight(), 3.5, 'weight total should be 3.5');

  // domestic $0.50 lb / international $1.50 lb
  equal(db.cart.totals.shipping(), 5.25, 'shipping total should be 5.25');
  equal(db.cart.totals.grand(), 950.25, 'amount total should be 945');

  equal($('#cart thead tr').length, 1, 'should be a header');
  equal($('#cart tfoot tr').length, 1, 'should be a footer');
  equal($('#cart tbody tr').length, 3, 'should be 3 items in body');

  equal($('#cart tbody tr:nth-child(1) .product-name').text(), 'iPhone 5s', 'name should be iphone 5s');
  equal($('#cart tbody tr:nth-child(1) .product-count').text(), '2', 'count should be 2');

  equal($('#cart tfoot tr #cart-count').text(), '4', 'should have 4 items in cart');
  equal($('#cart tfoot tr #cart-amount').text(), '$945.00', 'should have $945.00 in amount');
  equal($('#cart tfoot tr #cart-weight').text(), '3.50 lbs', 'should have 3.5 lbs for weight');
  equal($('#cart tfoot tr #cart-shipping').text(), '$5.25', 'should have $5.25 for shipping');
  equal($('#cart tfoot tr #cart-grand').text(), '$950.25', 'should have $950.25 for grand');
});


test('Add Order', function(){
  expect(14);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); // sale - 450
  createTestProduct('iPhone 5s', 'iphone-5s.png', 0.5, 200, 0); // sale - 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); // sale - 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally');
  $('select#select-customer').trigger('change');

  // 2 iphone 5s
  $('#products tr:nth-child(3) .product-image img').trigger('click');
  $('#products tr:nth-child(3) .product-image img').trigger('click');

  // 1 ipad air
  $('#products tr:nth-child(2) .product-image img').trigger('click');

  // 1 apple tv
  $('#products tr:nth-child(4) .product-image img').trigger('click');

  $('#purchase').trigger('click');

  equal($('#cart tbody tr').length, 0, 'should be no rows in the tbody after purchase');
  equal($('#cart-grand').text(), '', 'there should be no grand total after purchase');
  equal($('#select-customer').val(), 'default', 'dropdown should default after purchase');
  equal(db.orders.length(), 1, 'should be 1 order after purchase');
  ok(db.orders[0] instanceof Order, 'should be an Order instance after purchase');
  ok(db.orders[0].id, 'should have an ID after purchase');
  equal($('#orders thead th').length, 7, 'should have 7 columns in orders table');
  equal($('#orders tbody tr').length, 1, 'should have 1 row in orders table body');

  //assertions for the html of the orders table
  //timestamp comes from moment
  equal($('#orders tbody .order-time').text().split(' ').length, 5, 'date time should be formatted correctly');
  equal($('#orders tbody .order-customer').text(), 'Sally', 'should have customers name');
  equal($('#orders tbody .order-total').text(), '$945.00', 'should have customers total');
  equal($('#orders tbody .order-shipping').text(), '$5.25', 'should have customers shipping');
  equal($('#orders tbody .order-grand').text(), '$950.25', 'should have customers grand');
  equal($('#orders tbody .order-products-list li').length, 4, 'should have 4 itemsin order');

});

function createTestProduct(name, image, weight, price, off){
  $('#product-name').val(name);
  $('#product-image').val(image);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#product-off').val(off);
  $('#add-product').trigger('click');
}

function createTestCustomer(name, image, isDomestic){
  $('#customer-name').val(name);
  $('#customer-image').val(image);

  if(isDomestic){
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }

  $('#add-customer').trigger('click');
}






// 'use strict';

// module('Integration Testing', {setup: setupTest, teardown: teardownTest});

// function setupTest(){
//   turnHandlersOff();
//   turnHandlersOn();
//   db.products = [];
//   db.customers = [];
//   db.orders = [];
//   db.cart = {};
//   db.cart.products = [];
//   db.cart.totals = {};
//   Δdb.remove();
//   db.pagination.currentRowCount = 0;
//   db.pagination.currentPage = 1;
// }

// function teardownTest(){
// }

// // -------------------------------------------------------------------- //
// // -------------------Add Items to Shopping Cart-------------- //
// // -------------------------------------------------------------------- //

// test('Add Items to Shopping Cart', function(){
//   expect(5);

//   createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); //salePrice = 450
//   createTestProduct('iPhone 5s', 'iPhone-5s.png', 0.5, 200, 0); //salePrice = 200
//   createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); //salePrice = 95

//   createTestCustomer('Bob', 'bob.png', true);
//   createTestCustomer('Sally', 'sally.png', false);

//   //select which customer is making the purchase:
//   $('#selectCustomer').val('Sally');
//   $('#selectCustomer').trigger('change');
//   //add 1 ipad air to the cart:
//   $('#products tr:nth-child(2) .product-image img').trigger('click');
//   //add 2 iphone 5s to the cart:
//   $('#products tr:nth-child(3) .product-image img').trigger('click');
//   $('#products tr:nth-child(3) .product-image img').trigger('click');

//   //add 1 apple TV
//   $('#products tr:nth-child(4) .product-image img').trigger('click');

//   equal(db.cart.customer.name, 'Sally', 'shopping cart should belong to Sally');
//   equal(db.cart.products.length, 4, 'should be 4 items in shopping cart');
//   ok(db.cart.products[0] instanceof Product, 'item in products should be a product');
//   ok(db.cart.customer instanceof Customer, 'Sally should be a Customer');
//   equal(db.cart.totals.quantity, 4, 'should have chosen 4 items');
//   equal(db.cart.totals.price, 945, 'amount should equal 945');
//   equal(db.cart.totals.weight, 3.5, 'weight total should be 3.5');

//   //domestic $0.50 /lb, international $1.50 /lb
//   equal(db.cart.totals.shipping, 5.25, 'shipping total should be 5.25');
//   equal(db.cart.totals.grandTotal, 950.25, 'shipping total should be 950.25');

//   equal($('#cart thead tr').length, 1, 'should be a header');
//   equal($('#cart tfoot tr').length, 1, 'should be a footer');
//   equal($('#cart tbody tr').length, 3, 'should be 3 items in the table body');

//   equal($('#cart tbody tr:nth-child(1) .productName').text(), 'iPhone 5s', 'name should be iPhone 5s');
//   equal($('#cart tbody tr:nth-child(1) .productCount').text(), 2, 'count should be 2');

//   equal($('#cart tfoot tr #cartCount').text(), '4', 'should have 4 items in the cart');
//   equal($('#cart tfoot tr #cartAmount').text(), '$945.00', 'should have $945.00 in amount');
//   equal($('#cart tfoot tr #cartWeight').text(), '3.5 lbs', 'should have 3.5 lbs in weight');
//   equal($('#cart tfoot tr #cartShipping').text(), '$5.25', 'should have $5.25 in shipping');
//   equal($('#cart tfoot tr #cartGrand').text(), '$950.25', 'should have $950.25 for grand');

// });


// // -------------------------------------------------------------------- //
// // -------------------Customer DropDown and Shopping Cart-------------- //
// // -------------------------------------------------------------------- //

// test('Customer DropDown and Shopping Cart', function(){
//   expect(7);

//   for(var i = 0; i < 5; i++){
//     var name = Math.random().toString(36).substring(2);
//     var image = Math.random().toString(36).substring(2) + '.png';
//     var isDomestic = _.shuffle([true, false])[0];

//     createTestCustomer(name, image, isDomestic);
//   }
//   createTestCustomer('Bob', 'bob.png', true);
// //table headers:
// //name, count, amount(=count*salePrice), weight, shipping cost, total(amount+shipping)
//   equal(db.customers.length, 6, 'should have 6 customers');
//   equal($('select#selectCustomer option').length, 6, 'Should have 6 option tags');
//   equal($('select#selectCustomer option:nth-child(1)').val(), 'Bob', 'bob should be on top of the list');
//   equal($('select#selectCustomer option:nth-child(1)').text(), 'Bob', 'bob text should be on top of the list');
//   ok($('table#cart').length, 'shopping cart should be visible');//if it doesn't find it the length will be 0, which is false.
//   equal($('table#cart th').length, 6, 'should be 6 columns');
//   ok($('#purchase').length, 'purchase button should be visible');
// });

// // -------------------------------------------------------------------- //
// // ----------------------------Add Product----------------------------- //
// // -------------------------------------------------------------------- //

// test('Add Product', function(){
//   expect(11);

//   $('#product-image').val('ipad-air.jpg');
//   $('#product-name').val('Ipad Air');
//   $('#product-weight').val('1.0');
//   $('#product-price').val('500.00');
//   $('#product-off').val('10');
//   $('#add-product').trigger('click');

//   equal(db.products.length, 1, 'products array should have 1 element');
//   ok(db.products[0].id, 'id should be populated');
//   ok(db.products[0] instanceof Product, 'product should be an instanceof Product');
//   equal(db.products[0].image, 'ipad-air.jpg', 'product should have an image');
//   equal(db.products[0].name, 'Ipad Air', 'product should have a name');
//   equal(db.products[0].weight, 1.0, 'product should have a weight');

//   //QUnit.close(db.products[0].salePrice(), 450, 0.01, 'product should have a sale price');

//   equal($('#products tr').length, 2, 'should be 2 rows in table');
//   equal($('#products tr:nth-child(2) > td').length, 6, 'should be 6 columns in row');
//   equal($('#products .product-name').text(), 'Ipad Air', 'name column should be populated');
//   equal($('#products .product-sale').text(), '$450.00', 'sale column should be populated');
//   equal($('#products .product-image img').attr('src'), '/img/ipad-air.jpg', 'image column should be populated');
// });

// // -------------------------------------------------------------------- //
// // ---------------------------Product Pagination----------------------- //
// // -------------------------------------------------------------------- //

// test('Product Pagination', function(){
//   expect(20);
//   for(var i = 0; i < 12; i++){
//     var name = Math.random().toString(36).substring(2);
//     var image = Math.random().toString(36).substring(2) + '.png';
//     var weight = Math.random() * 100;
//     var price = Math.random() * 1000;
//     var off = Math.random() * 100;

//     createTestProduct(name, image, weight, price, off);
//   }

//   equal(db.products.length, 12, 'products array should have 12 elements');
//   equal(db.pagination.perPage, 5, 'should be 5 products per page');
//   equal(db.pagination.currentPage, 1, 'should be on first page');
//   equal($('#products tr').length, 6, 'should have 5 products in table');
//   equal($('#previous.hidden').length, 1, 'previous button should be hidden');
//   equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');
//   equal($('#next').length, 1, 'next button should be there');

//   $('#next').trigger('click');

//   equal(db.pagination.currentPage, 2, 'should be on second page');
//   equal($('#products tr').length, 6, 'should have 5 products in table');
//   equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
//   equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

//   $('#next').trigger('click');

//   equal(db.pagination.currentPage, 3, 'should be on third page');
//   equal($('#products tr').length, 3, 'should have 3 products in table');
//   equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
//   equal($('#next.hidden').length, 1, 'next button should  be hidden');

//   $('#previous').trigger('click');
//   $('#previous').trigger('click');
//   equal(db.pagination.perPage, 5, 'should be 5 products per page');
//   equal(db.pagination.currentPage, 1, 'should be on first page');
//   equal($('#products tr').length, 6, 'should have 5 products in table');
//   ok($('#previous').hasClass('hidden'), 'previous button should be hidden');
//   ok(!$('#next').hasClass('hidden'), 'next button should not be hidden');
// });

// // -------------------------------------------------------------------- //
// // ----------------------------Add a customer-------------------------- //
// // -------------------------------------------------------------------- //

// test('Add a customer', function(){
//   expect(7);

//   $('#customerImage').val('bob.png');
//   $('#customerName').val('Bob Jenkins');
//   $('#domestic')[0].checked = true;//because they're mutually exclusive, obvs the international one will not be checked.

//   $('#addCustomer').trigger('click');

//   equal(db.customers.length, 1, 'should have 1 customer in array');
//   ok(db.customers[0] instanceof Customer, 'should be an instance of Customer');
//   equal(db.customers[0].name, 'Bob Jenkins', 'name should be present');
//   equal(db.customers[0].image, 'bob.png', 'image should be present');
//   ok(db.customers[0].id, 'id should be present');
//   ok(db.customers[0].isDomestic, 'should be domestic');//it's a binary decision, it's either Dom or Int.

//   ok(!$('#domestic')[0].checked, 'domestice should not be checked');
// });

// // -------------------------------------------------------------------- //
// // ----------------------------Functions------------------------------- //
// // -------------------------------------------------------------------- //

// function createTestProduct(name, image, weight, price, off){
//   $('#product-name').val(name);
//   $('#product-image').val(image);
//   $('#product-weight').val(weight);
//   $('#product-price').val(price);
//   $('#product-off').val(off);
//   $('#add-product').trigger('click');
// }

// function createTestCustomer(name, image, isDomestic){
//   $('#customerName').val(name);
//   $('#customerImage').val(image);

//   if('#isDomestic'){
//     $('#domestic')[0].checked = true;
//   }else{
//     $('#international')[0].checked = true;
//   }

//   $('#addCustomer').trigger('click');
// }
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
