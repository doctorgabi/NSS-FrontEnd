'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

// test('name-of-test', function(){
//   expect(4);
// });

// asyncTest('Calculate 2 numbers', function(){
//   expect(4);

//   $('#op1').val('3');
//   $('#op2').val('2');
//   $('#operator').val('*');

//   $('#result').on('DOMChanged', function(){
//     deepEqual($('#op1').val(), '', 'op1 should be blank');
//     deepEqual($('#op2').val(), '', 'op2 should be blank');
//     deepEqual($('#operator').val(), '', 'operator should be blank');

//     deepEqual($('#result').text(), '6', 'result should be 6');

//     start();
//   });
//   $('#calculate').trigger('click');
// });


// test('populate the history list', function(){
//   expect(8);

//   $('#op1').val('3');
//   $('#operator').val('+');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');

//   deepEqual($('#history > li').length, 1, 'should be 1 li');

//   $('#op1').val('7');
//   $('#operator').val('*');
//   $('#op2').val('8');
//   $('#calculate').trigger('click');

//   deepEqual($('#history > li').length, 2, 'should be 2 LIs');
//   deepEqual($('#history > li:first-child > span').length, 4, 'should be 4 spans');
//   ok($('#history > li:first-child > span:first-child').hasClass('op1'), 'first span has class op1');
//   ok($('#history > li:first-child > span:nth-child(2)').hasClass('operator'), '3ndd span has class operator');
//   ok($('#history > li:first-child > span:nth-child(3)').hasClass('op2'), '3rd span has class op2');
//   ok($('#history > li:first-child > span:nth-child(4)').hasClass('result'), 'last span has class result');
//   ok($('#history > li:last-child').text, '3 + 2 = 5', 'string should concatenate correctly');
// });


// test('create buttons and alternately color the li rows', function(){
//   expect(2);

//   $('#op1').val('3');
//   $('#operator').val('+');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');

//   $('#op1').val('7');
//   $('#operator').val('*');
//   $('#op2').val('8');
//   $('#calculate').trigger('click');

//   $('#op1').val('8');
//   $('#operator').val('/');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');

//   $('#op1').val('2');
//   $('#operator').val('-');
//   $('#op2').val('9');
//   $('#calculate').trigger('click');

//   ok($('#history > li > input').hasClass('button'), 'li has button input at the end');
//   deepEqual($('#history > li:nth-child(even)').css('background-color'), 'rgb(255, 255, 255)', 'alternating rows have different colors');
// });


// test('remove rows', function(){
//   expect(5);

//   $('#op1').val('3');
//   $('#operator').val('+');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');

//   $('#op1').val('7');
//   $('#operator').val('*');
//   $('#op2').val('8');
//   $('#calculate').trigger('click');

//   $('#op1').val('8');
//   $('#operator').val('/');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');

//   $('#op1').val('2');
//   $('#operator').val('-');
//   $('#op2').val('9');
//   $('#calculate').trigger('click');

//   deepEqual($('#history > li').length, 4, 'should be four results');
//   deepEqual($('#history > li:first-child > .result').text(), '-7', 'top row result should be -7');

//   $('#history > li:first-child > .button').trigger('click');

//   deepEqual($('#history > li').length, 3, 'should be three results');
//   deepEqual($('#history > li:first-child > .result').text(), '4', 'top row result should be 4');
//   deepEqual($('#history > li:nth-child(even)').css('background-color'), 'rgb(255, 255, 255)', 'alternating rows have different colors');

// });

// test('sum results', function(){
//   expect(1);

//   $('#op1').val('3');
//   $('#operator').val('+');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');//result 5

//   $('#op1').val('7');
//   $('#operator').val('-');
//   $('#op2').val('8');
//   $('#calculate').trigger('click');//result -1

//   $('#op1').val('8');
//   $('#operator').val('/');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');//result 4

//   $('#op1').val('2');
//   $('#operator').val('*');
//   $('#op2').val('4');
//   $('#calculate').trigger('click');//result 8

//   $('#sum').trigger('click');

//   deepEqual($('#sumResult').val(), '16', 'sum of results should be 16');
// });

// test('multiply results', function(){
//   expect(1);

//   $('#op1').val('3');
//   $('#operator').val('+');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');//result 5

//   $('#op1').val('7');
//   $('#operator').val('-');
//   $('#op2').val('8');
//   $('#calculate').trigger('click');//result -1

//   $('#op1').val('8');
//   $('#operator').val('/');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');//result 4

//   $('#op1').val('2');
//   $('#operator').val('*');
//   $('#op2').val('4');
//   $('#calculate').trigger('click');//result 8

//   $('#product').trigger('click');

//   deepEqual($('#productResult').val(), '-160', 'product of results should be -160');
// });


test('clear negatives and still sum or multiply results', function(){
  expect(3);

  $('#op1').val('3');
  $('#operator').val('+');
  $('#op2').val('2');
  $('#calculate').trigger('click');//result 5

  $('#op1').val('7');
  $('#operator').val('-');
  $('#op2').val('8');
  $('#calculate').trigger('click');//result -1

  $('#op1').val('8');
  $('#operator').val('/');
  $('#op2').val('2');
  $('#calculate').trigger('click');//result 4

  $('#op1').val('2');
  $('#operator').val('*');
  $('#op2').val('4');
  $('#calculate').trigger('click');//result 8

  $('#negative').trigger('click');
  deepEqual($('#history > li').length, 3, 'should be only three results');

  $('#product').trigger('click');
  deepEqual($('#productResult').val(), '160', 'product of results should be -160');

  $('#sum').trigger('click');
  deepEqual($('#sumResult').val(), '17', 'sum of results should be 17');
});


// test('clear positives and still sum or multiply results', function(){
//   expect(3);

//   $('#op1').val('3');
//   $('#operator').val('+');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');//result 5

//   $('#op1').val('7');
//   $('#operator').val('-');
//   $('#op2').val('8');
//   $('#calculate').trigger('click');//result -1

//   $('#op1').val('-8');
//   $('#operator').val('/');
//   $('#op2').val('2');
//   $('#calculate').trigger('click');//result -4

//   $('#op1').val('-2');
//   $('#operator').val('*');
//   $('#op2').val('4');
//   $('#calculate').trigger('click');//result -8

//   $('#negative').trigger('click');
//   deepEqual($('#history > li').length, 3, 'should be only three results');

//   $('#product').trigger('click');
//   deepEqual($('#productResult').val(), '-32', 'product of results should be -32');

//   $('#sum').trigger('click');
//   deepEqual($('#sumResult').val(), '-13', 'sum of results should be -13');
// });