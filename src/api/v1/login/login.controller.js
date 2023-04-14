const appRoot = require('app-root-path');
const loginValidation = require('./login.validation');
const logger = require(appRoot + '/src/logger').apiLogger;
const twilioUtil = require(appRoot + '/src/util/twilio-util');
const emailUtil  = require(appRoot + '/src/util/email-util');
const sendEmailUtil = emailUtil.sendEmail();
const User = require(appRoot + '/src/model/user');
const constant = require(appRoot + '/src/constant');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createLogin = async (req, res) => {
    try {
        const body = ({
            email,
            password,
        } = req.body);
        logger.info('In createLogin - Validating  Login input data');
        const { error } = loginValidation.validateLoginUserData.validate(body, {
            abortEarly: false,
        });
        if (error) {
            logger.info(`Validation error ${JSON.stringify(error.details)}`);
            return res.status(400).json({
                message: 'Invalid Request. Please check and try again.',
                error: error.details,
            });
        }
        logger.info('All validations passed');
        const loginUser = await User.findOne({
            email: email,
        });
        console.log('loginUserpassword', loginUser);
        if (!loginUser) {
            return res.status(404).json({
                message: 'Email is incorrect'
            });
        }
        logger.info('Going to compare password');
        let match = await bcrypt.compare(password, loginUser.password);
        if (!match) {
            return res.status(400).json({
                message: "Incorrect Password.",
            });
        }
        logger.info('Returning back User data with success code 200');
        let token = await jwt.sign({ id: loginUser._id }, constant.JWT_SECRET_LOGIN);
        return res.status(200).json({
            data: loginUser,
            token: token,
            message: 'Login is successfully'
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const body = ({
            email,
        } = req.body);
        logger.info('In createLogin - Validating  Login input data');
        const loginUser = await User.findOne({
            email: email,
        });
        console.log('loginUserpassword', loginUser);
        if (!loginUser) {
            return res.status(404).json({
                message: 'Email is incorrect'
            });
        }
        const randomPass = await Math.floor(100000 + Math.random() * 900000);
        console.log('randomPass', randomPass);
        const emailBody = {
            email_from_name: 'IJCIS',
            email_from: 'mir61622@gmail.com',
            email_to: email,
            subject: 'Reset Password',
            emailContent:`Here is your forgot password verification code ${randomPass}`,
            imageAttachment: []
        }
        const sendEmailToUser = await sendEmailUtil.emailWithLoginInfo(emailBody);
        if (!sendEmailToUser) {
            return res.status(400).json({
                message: 'Error in sending email to user'
            });
        }
        const newBody = {
            forgot_pass: randomPass,
        }
        await User.findByIdAndUpdate({ _id: loginUser._id }, newBody, {
            new: true,
        });
        return res.status(200).json({
            message: 'Forgot Password email has been send with verification code'
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}


exports.UpdatePassword = async (req, res) => {
    try {
        const body = ({
            email,
            password,
            code,
        } = req.body);
        logger.info('In createLogin - Validating  Login input data');
        const loginUser = await User.findOne({
            email: email,
        });
        if (!loginUser) {
            return res.status(404).json({
                message: 'Email is incorrect'
            });
        }
        const codeUser = await User.findOne({
            email: email,
            forgot_pass: code,
        });
        if (!codeUser) {
            return res.status(404).json({
                message: 'Verify code is incorrect'
            });
        }
        let salt = await bcrypt.genSalt(10);
        const newpassword = await bcrypt.hash(password, salt);
        const updateUserBody = {
            password: newpassword,
            forgot_pass: '',
        }
        await User.findByIdAndUpdate({ _id: loginUser._id }, updateUserBody, {
            new: true,
        });
        const emailBody = {
            email_from_name: 'IJCIS',
            email_from: 'mir61622@gmail.com',
            email_to: email,
            subject: 'Update Password',
            emailContent:`Congratulations! your password is updated`,
            imageAttachment: []
        }
        const sendEmailToUser = await sendEmailUtil.emailWithLoginInfo(emailBody);
        if (!sendEmailToUser) {
            return res.status(400).json({
                message: 'Error in sending email to user'
            });
        }
        return res.status(200).json({
            message: 'Password is updated. Login again'
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            message: 'Server error'
        })
    }
}
