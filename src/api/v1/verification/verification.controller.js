const appRoot = require('app-root-path');
const VerifyValidation = require('./verification.validation');
const logger = require(appRoot + '/src/logger').apiLogger;
const twilioUtil = require(appRoot + '/src/util/twilio-util');
const verifyingSMS = twilioUtil.verifySMSCode();
const User = require(appRoot + '/src/model/user');

exports.VerifyUser = async (req,res) =>{
    try {
        const body = ({
            user_email,
            phone_number,
            verification_code,
        } = req.body);
    logger.info('In VerifyCode - Validating verification code');
    const {error} = VerifyValidation.validateVerificationCode.validate(body,{
        aboutEarly:false,
    });
    if(error){
        logger.info(`Validation Error ${JSON.stringify(error.details)}`);
        return res.status(400).json({
            message: 'Invalid Request. Please check and try again.',
            error: error.details,
        });
    }
    logger.info('All validations passed');
    logger.info('calling [verificationCode] util to verify sms code by twillo');
    const verifyCode = await verifyingSMS.verify({ phone_number, verification_code});
    if(verifyCode && !verifyCode.valid){
        return res.status(400).json({
            message: `Phone number is not correct or code is not correct.
				 Please check and try again.`,
        });
    }
    const user = await User.findOne({
        email: user_email,
    })
        logger.info('Returning back user data with success code 200');
        return res.status(200).json({
            message: 'Your Number is verified. Check your mail for portal details',
            data: user,
        });
    } catch (error) {
        logger.error(JSON.stringify((error = error.stack)));
        return res.status(500).json({
            message: 'Internal Server Error. Please try again later.',
            error: error,
        });
    }
}