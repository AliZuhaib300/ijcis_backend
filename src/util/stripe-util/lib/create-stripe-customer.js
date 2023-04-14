const appRoot = require('app-root-path');
const logger = require(appRoot + '/src/logger').apiLogger;
const stripeUtility = require(appRoot + '/src/util/stripe-util');
const stripe = require('stripe')('sk_test_51HuvEhLexm6rjU0KxEVDnC74eGOhLScD5PdZfZgyCZV0Z9d41hs3bESpuhxRNlFYN7ZhRDhUDZnMJa44GPwCVH4Z00vvqwNf92');

module.exports = {
	createCustomer: async function (params) {
		const { name, email, token } = params;
		try {
			logger.info(`starting stripeUtilMethod [createCustomer]`);
			if (token) {
				logger.info(`calling Stripe Api [customer.create] to create customer on stripe  `);
				const createCustomer = await stripe.customers.create({
					name: name,
					email: email,
					source: token,
				})
				if (createCustomer) {
					logger.info(`Stripe  Customer created successfully returning CustomerId: ${createCustomer.id}`);
					return createCustomer;
				} else {
					return null;
				}
			} else {
				return null;
			}
		} catch (error) {
			logger.error(JSON.stringify(error = error.stack));
			return null;
		}
	},
}
