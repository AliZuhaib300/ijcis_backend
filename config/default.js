'use strict';

/* default.js, node-config default configuration.

   All application configuration variables should be represented herein, even
   if only to have default or empty value.

   If you would like to change any of these values for your dev environment, create
   a local.js file in this directory (which will be gitignored), in which individual
   properties can be specified which overwrite any of the values below.

*/

module.exports = {

  auth: {
    public: {
      token: fromEnv('PUBLIC_API_TOKEN', '95D64240-428B-459C-B018-472D353F3904'),
    },
  },

  serve: {
    port: process.env.PORT || 3000,
    api: {
      cors: {
        whitelist: fromEnv('CORS_ALLOW_ORIGIN', [
          'http://localhost:3000',
        ].join(',')),
      },
    },
  },

  datasource: {
    databaseUrl: fromEnv('MONGODB_URL', 'mongodb+srv://dbIjcis:dbIjcisjou@cluster0.edbet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
  },

  twilio: {
    accountSid: fromEnv('TWILIO_ACCOUNT_SID', 'AC24b502e4bb762f12a894c0a31b2e5757'),
    authToken: fromEnv('TWILIO_AUTH_TOKEN', 'de9bab9c1305415b77940796899a36e2'),
    smsServiceSID: fromEnv('SMS_SERVICE_SID', 'VA195f3624ef9c2878ff87b2775bd30bdf'),
  },

  sendGrid: {
    apiKey: fromEnv('SEND_GRID_API_KEY', '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'),
    forgotPassLink:fromEnv('SEND_GRID_EMAIL_FROM', 'http://localhost:3000/update-password'),
  },
  stripe: {
    apiKey: fromEnv('STRIPE_API_SECRET_KEY', 'sk_test_51HrIuYBzY9GDlMt18KnCU4ebMLqfUA7GqD5OQcviWr5p5ZJnnyI2qYl4U4FGbfmi8hVXFda5GbnP7BIHMyGzJnpl00gYmmHpuy'),
  },

  environment: {
    nodeEvn: fromEnv('NODE_ENV', 'development'),
  },

};

// In production environments, read from the environment. Otherwise, use a
// default for development, allowing the value to be overridden.
function identity(x) {
  return x;
}

// Read from the environment, or use a default.
function fromEnv(varName, defValue, transform) {
  transform = transform || identity;
  const envValue = process.env[varName];
  if (envValue !== undefined) {
    return transform(envValue);
  }
  return defValue;
}
