const mongoose = require('mongoose');

const csvStorage = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    headers: [{
        type: String,
        required: true
    }],
    data: {
        type: Object,
        required: true
    }
}, { timestamps: true });

const CsvStorage = mongoose.model('CsvStorage', csvStorage);
module.exports = CsvStorage;