const appRoot = require('app-root-path');
const logger = require(appRoot + '/src/logger').apiLogger;
const stripeUtility = require(appRoot + '/src/util/stripe-util');
const stripe = require('stripe')('sk_test_51HuvEhLexm6rjU0KxEVDnC74eGOhLScD5PdZfZgyCZV0Z9d41hs3bESpuhxRNlFYN7ZhRDhUDZnMJa44GPwCVH4Z00vvqwNf92');

module.exports = {
	refundCustomer: async function (params) {
		const { charge } = params;
		try {
			logger.info(`starting stripeUtilMethod [refundCustomer]`);
			logger.info(`calling Stripe Api [refunds] to refund customer on stripe  `);
			const refund = await stripe.refunds.create({
				charge: charge,
			});
			if (refund) {
				return refund;
			} else {
				return null;
			}
		} catch (error) {
			logger.error(JSON.stringify(error = error.stack));
			return null;
		}
	}
}
