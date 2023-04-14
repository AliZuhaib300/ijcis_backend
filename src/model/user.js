const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    user_name: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    postal_code: {
        type: String,
    },
    about_me: {
        type: String,
    },
    role: {
        type: String,
    },
    is_verified: {
        type: Boolean,
        default: false,
    },
    forgot_pass: {
        type: String,
    }
});

userSchema.set('timestamps', true);

module.exports = mongoose.model('users', userSchema);