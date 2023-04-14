const appRoot = require('app-root-path');
const sgMail = require('@sendgrid/mail');
const logger = require(appRoot + '/src/logger').apiLogger;
const config = require('config');
const SENDGRID_API_KEY = config.get('sendGrid.apiKey');
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = {
	//In this method we will sendForgotPassword Emails
	emailWithLoginInfo: async function (params) {
		try {
			logger.info(`starting utilMethod [send]`);
			const emailFromName = params.email_from_name;
			const emailFrom = params.email_from;
			const emailTo = params.email_to;
			const subject = params.subject;
			const emailContent = params.emailContent;
			const attachment = params.imageAttachment || [];
			//sending email
			const msg = {
				to: emailTo,
				from: {
					email: emailFrom,
					name: emailFromName
				},
				subject: subject,
				html: emailContent,
				attachments: attachment,
			}
			// if (!LIVE_MODE) {
			// 	msg.mail_settings = {
			// 		sandbox_mode: {
			// 			enable: true
			// 		}
			// 	}
			// }
			logger.info(`calling SendGrid API to send email to ${emailTo} From ${emailFrom}`)
			await sgMail.send(msg);
			logger.info(` email sent successfully to: ${emailTo} From: ${emailFrom}`)
			return true;
		} catch (error) {
			logger.error(JSON.stringify(error = error.stack));
			return false;
		}
	},
}
