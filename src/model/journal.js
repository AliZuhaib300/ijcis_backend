const mongoose = require('mongoose');
const schema = mongoose.Schema;
const journalSchema = new schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    journal_title: {
        type: String,
    },
    journal_initials:{
        type: String,
    },
    journal_abbreviation:{
        type: String,
    },
    publisher:{
        type: String,
    },
    journal_issn:{
        type: String,
    },
    is_published: {
        type: Boolean,
        default: false
    }
});

journalSchema.set('timestamps', true);

module.exports = mongoose.model('journals', journalSchema);