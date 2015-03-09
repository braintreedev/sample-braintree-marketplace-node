casper.test.begin("Marketplace API Tests", function suite(test) {

	casper.start("http://localhost:3000/", function() {
		test.assertHttpStatus(200, 'Page loaded');
	});

	casper.then(function() {
		this.test.comment("Finding 'Sub_Merchant_1'...");
		this.fillSelectors('form#findForm', {
			'input[name="merchant_id"]': 'Sub_Merchant_1'
		}, true);

		casper.waitForUrl("http://localhost:3000/find", function() {
			test.assertTextExists("Found merchant", "FIND Submerchant test");
			casper.back();
		}, null, 20000);
	});

	casper.then(function() {
		this.withFrame(0, function() {
			this.waitForSelector("#credit-card-number", function() {
				this.test.comment("Filling in Dropin Form");

				this.sendKeys("#credit-card-number", "4111111111111111");
				this.sendKeys("#expiration", "0120");
				this.sendKeys("#cvv", "123");
			});
		});
	});

	casper.then(function() {
		this.fillSelectors('form#processForm', {
			'input[name="merchant_id"]': 'Sub_Merchant_1',
			'input[name="total"]': '10',
			'input[name="service"]' : '1'
		}, true);

		casper.waitForUrl("http://localhost:3000/process", function() {
			test.assertTextExists("Transaction processed successfully", "Process Transaction (with service fee) test");
			casper.back();
		}, null, 20000);
	});

	casper.run(function() {
		test.done();
	});
});