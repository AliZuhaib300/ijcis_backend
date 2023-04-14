const mongoose = require('mongoose');
const schema = mongoose.Schema;
const contactSchema = new schema({
    journal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'journals'
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    affiliation:{
        type: String,
    },
    phone:{
        type: String,
    },
    address:{
        type: String,
    },
});

contactSchema.set('timestamps', true);

module.exports = mongoose.model('contacts', contactSchema);