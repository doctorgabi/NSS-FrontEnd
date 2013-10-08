test("withdraw", function(){
  deepEqual(  withdraw(1000, 50), 950, "Tests withdraw function");
})

test("deposit", function(){
  deepEqual( deposit(1000, 50), 1050, "Tests deposit function");
})

