/*
 * @module
 * @description
 * Main entry point for Twilio Utility
 *
 */

'use strict';

module.exports = {
	// send sms
	sendSMS: function () {
		return require('./lib/send-sms');
	},

	// verify sms code
	verifySMSCode: function () {
		return require('./lib/verify-sms-code');
	},

}
