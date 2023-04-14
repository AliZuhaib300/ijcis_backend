const appRoot = require('app-root-path');
const logger = require(appRoot + '/src/logger').apiLogger;
const stripeUtility = require(appRoot + '/src/util/stripe-util');
const stripe = require('stripe')('sk_test_51HuvEhLexm6rjU0KxEVDnC74eGOhLScD5PdZfZgyCZV0Z9d41hs3bESpuhxRNlFYN7ZhRDhUDZnMJa44GPwCVH4Z00vvqwNf92');

module.exports = {
	chargeCustomer: async function (params) {
		const {amount, currency, customer_id} = params;
		try {
			logger.info(`starting stripeUtilMethod [chargeCustomer]`);
			logger.info(`calling Stripe Api [customer.charge] to create customer on stripe  `);
			const chargeCustomer = await stripe.charges.create({
				amount: parseInt(parseFloat(amount * 100).toFixed(2)),
				currency: currency,
				customer: customer_id,
			})
			if (chargeCustomer) {
				logger.info(`Stripe  Customer charged successfully returning CustomerId: ${chargeCustomer.id}`);
				return chargeCustomer;
			} else {
				return null;
			}
		} catch (error) {
			logger.error(JSON.stringify(error = error.stack));
			return null;
		}
	},
}
