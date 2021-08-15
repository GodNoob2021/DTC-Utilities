const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
    guildID: String,
    userID: String,
    content: Array
})

const model = mongoose.model('warn', warnSchema);

module.exports = model;