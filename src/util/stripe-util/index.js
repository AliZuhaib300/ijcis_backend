/*
 * @module
 * @description
 * Main entry point for Stripe Utility
 *
 */

'use strict';

module.exports = {

	// Create Customer on Stripe
	createCustomer: function () {
		return require('./lib/create-stripe-customer');
	},

	// Charge Customer on Stripe
	chargeCustomer: function () {
		return require('./lib/charge-stripe-customer');
	},

	// Refund Customer on Stripe
	refundCustomer: function () {
		return require('./lib/refund-stripe-customer');
	},

}
