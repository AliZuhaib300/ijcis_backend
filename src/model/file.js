const mongoose = require('mongoose');
const schema = mongoose.Schema;
const fileSchema = new schema({
    journal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'journals'
    },
    file_type: {
        type: String,
    },
    file_size:{
        type: String,
    },
    file_name:{
        type: String,
    },
    file_url:{
        type: String,
    },
});

fileSchema.set('timestamps', true);

module.exports = mongoose.model('files', fileSchema);