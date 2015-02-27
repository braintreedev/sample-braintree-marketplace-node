# Using the Braintree MarketPlace API in Node to create a transaction with service fees

This is an example of the Braintree Marketplace API using the official Node SDK in Express to create a transaction with service fees.

This demo performs the following technical implementations:

* Add a submerchant account
* Look up a merchant account
* Create a submerchant transaction with service fee

## Technology

This demo uses

* Node 0.12.0 or higher
* The [Express](http://expressjs.com/) web framework
* The [Braintree Node.js SDK](https://developers.braintreepayments.com/javascript+node/sdk/server/overview)

## Running the demo locally

* Run `npm install` to install all dependencies
* Run `npm start` to start the Express app
* Visit `http://127.0.0.1:3000/` in your browser
* Add a submerchant
	* Fill in a desired id and click add
	* All other fields are pre-populated with dummy data
* Find a merchant account
	* Fill in the same id that was just added to verify it has been added 
* Create a submerchant transaction with service fee
	* Merchant ID: same one previously used
	* Total Amount: any value
	* Service Fee: any value less than total amount
	* Fill in the form using PayPal or a Credit Card:
		* PayPal
			* Email: us-customer@commercefactory.org
			* Password: test1234	
		* Credit Card
			* Number: `4111 1111 1111 1111`
			* CVV: `123`
			* Expiration date: `11/2020`
	* Click Checkout
* You will receive a message that says "Success" or "Failed" for each function

## Useful links

* [The Braintree Node.js SDK](https://developers.braintreepayments.com/javascript+node/sdk/server/overview)
* [Guide for Marketplace using Node.js](https://developers.braintreepayments.com/javascript+node/guides/marketplace/overview)
