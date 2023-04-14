const appRoot = require('app-root-path');
const config = require('config');
const logger = require(appRoot + '/src/logger').apiLogger;
const TWILIO_ACCOUNT_SID = config.get('twilio.accountSid');
const TWILIO_AUTH_TOKEN = config.get('twilio.authToken');
const SMS_SERVICE_SID = config.get('twilio.smsServiceSID');
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
	send: async function (params) {
		try {
			const phoneNumber = params.phone_number;
			logger.info(`calling Twilio API to send sms to ${phoneNumber}`)
			await client.verify.services(SMS_SERVICE_SID)
				.verifications
				.create({to: phoneNumber, channel: 'sms'})
				.then(verification => console.log(verification.status));
			logger.info(` code sent successfully to: ${phoneNumber}`)
			return true;
		} catch (error) {
			logger.error(JSON.stringify(error = error.stack));
			return false;
		}
	}
}
