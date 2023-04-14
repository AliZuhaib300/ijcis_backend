const appRoot = require('app-root-path');
const logger = require(appRoot + '/src/logger').apiLogger;
const User = require(appRoot + '/src/model/user');
const twilioUtil = require(appRoot + '/src/util/twilio-util');
const sendingSMS = twilioUtil.sendSMS();
// In this method we will validate user with user id
exports.validateUser = async (req, res, next) => {
	logger.info(`starting middleware [validateInfluencer] to validate influencer`)
	try {
		const { email } = req.body;
		if (email) {
			logger.info(`Checking if Influencer exists against email: ${email}`)
			const userToFind = await User.findOne({ email: email})
			if (userToFind && userToFind.is_verified) {
				logger.info(`${userToFind.role} is already exist against email: ${email}. Return with status code 400`);
				return res.status(400).json({
					message: `Email address is already registered and verified`
				});
			}
			if (userToFind && !userToFind.is_verified) {
				const smsSend = await sendingSMS.send(req.body);
				if (smsSend) {
					return res.status(200).json({
						message: `Email address is already registered. Verification code send again to your number`,
						data: userToFind,
						is_verifying: true,
					});
				}
			}
		}
		logger.info(`End middleware [validateUser]`);
		next();
	} catch (error) {
		logger.error(JSON.stringify(error = error.stack));
		return res.status(500).json({
			message: 'Internal Server Error. Please try again later.',
			error: error
		});
	}
}

exports.validateAdmin = async (req, res, next) => {
	logger.info(`starting middleware [validateAdmin] to validate Admin`)
	try {
		const { admin_id } = req.body;
		if (admin_id) {
			logger.info(`Checking if Admin exists against Id: ${admin_id}`)
			const userToFind = await User.findById(admin_id);
			if (userToFind && userToFind.role !== "Admin") {
				logger.info(`This user is not allowed to update. Return with status code 304`);
				return res.status(304).json({
					message: `This user is not allowed to update`
				});
			}
		}
		logger.info(`End middleware [validateAdmin]`);
		next();
	} catch (error) {
		logger.error(JSON.stringify(error = error.stack));
		return res.status(500).json({
			message: 'Internal Server Error. Please try again later.',
			error: error
		});
	}
}
