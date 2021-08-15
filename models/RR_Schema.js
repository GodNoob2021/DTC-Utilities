const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const RR_Schema = new mongoose.Schema({
    guildID: reqString,
    messageID: reqString,
    channelID: reqString,
    roles: [{
        emoji: reqString,
        roleID: reqString
    }]
});

const model = mongoose.model('Reaction_Role', RR_Schema);

module.exports = model;