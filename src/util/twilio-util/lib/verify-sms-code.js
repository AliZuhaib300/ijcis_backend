const appRoot = require('app-root-path');
const config = require('config');
const logger = require(appRoot + '/src/logger').apiLogger;
const TWILIO_ACCOUNT_SID = config.get('twilio.accountSid');
const TWILIO_AUTH_TOKEN = config.get('twilio.authToken');
const SMS_SERVICE_SID = config.get('twilio.smsServiceSID');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
	verify: async function (params) {
		try {
			const code = params.code;
			const phoneNumber = params.phone_number;
			logger.info(`calling Twilio API to verify sms code to ${phoneNumber}`)
			const verified = await client.verify.services(SMS_SERVICE_SID)
				.verificationChecks
				.create({to: phoneNumber, code: code})
				.then(verification_check => verification_check);
			logger.info(` code verified successfully for: ${phoneNumber}`)
			return verified;
		} catch (error) {
			logger.error(JSON.stringify(error = error.stack));
			return false;
		}
	}
}
