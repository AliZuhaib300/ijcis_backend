/*
 * @module
 * @description
 * Main entry point for Email Utility
 *
 */

'use strict';

module.exports = {

	//Send Email
	sendEmail: function() {
		return require('./lib/send-email');
	},

}
