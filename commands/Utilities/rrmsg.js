const RR_Model = require('../../models/RR_Schema')

module.exports = {
    name: 'rrmsg',
    permissions: ['MANAGE_ROLES'],
    aliases: [],
    description: 'Set a Reaction role message',
    async execute(client, message, args){
        const msgGuild = message.guild;
        const msgChannel = message.mentions.channels.first() || message.channel;
        const PREFIX = process.env.PREFIX
        let messageArgs = message.content.substring(PREFIX.length).split(" ");
        const msg = messageArgs.slice(2).join(' ');
        if(!msgChannel) return message.channel.send("Please mention a channel for the message");
        const newMsg = await msgChannel.send(msg);

        if(msgGuild.me.hasPermission('MANAGE_MESSAGES')){
            message.delete()
        }
        if(!msgGuild.me.hasPermission('MANAGE_ROLES')){
            message.channel.send("I don't have permissions to manage roles")
            return;
        }
        new RR_Model({
            guildID: msgGuild.id,
            channelID: msgChannel.id,
            messageID: newMsg.id
        })
        .save()
        .catch(() => {
            message.channel.send('Failed to save to database, Please report it')
            .then((message) => {
                message.delete({
                    timeout: 10000
                });
            })
        })
    }
}