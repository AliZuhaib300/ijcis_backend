const mongoose = require('mongoose');
const schema = mongoose.Schema;
const sectionSchema = new schema({
    journal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'journals'
    },
    title:{
        type: String,
    },
    section_title:{
        type: String,
    },
    abbreviation:{
        type: String,
    },
    policy:{
        type: String,
    },
    word_count:{
        type: String,
    },
    options:{
        type: String,
    },
    identify:{
        type: String,
    },
    section_editors:{
        type: String,
    },
});

sectionSchema.set('timestamps', true);

module.exports = mongoose.model('sections', sectionSchema);