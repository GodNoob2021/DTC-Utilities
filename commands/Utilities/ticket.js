module.exports = {
    name: 'ticket',
    aliases: ['ticketopen', 'newticket', 'createticket'],
    permissions: [],
    description: 'opens a ticket',
    async execute(client, message, cmd, args, Discord){
        const channel = await message.guild.channels.create(`Ticket: ${message.author.tag}`);
        channel.setParent('868938688405598208');

        channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false,
            READ_MESSAGE_HISTORY: false,
            VIEW_CHANNEL: false
        });
        channel.updateOverwrite(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            VIEW_CHANNEL: true
        });

        const reactionMessage = await channel.send('Thank you for contacting us, Support will be with you soon');

        try {
            reactionMessage.react('🔒')
            reactionMessage.react('⛔')
        }catch (err){
            channel.send('error sending emojis');
            throw err;
        }

        const collector = reactionMessage.createReactionCollector((reaction, user) =>
            message.guild.members.cache.find((member) => member.id === user.id).hasPermission('ADMINISTRATOR'),
            { dispose: true }
        );

        collector.on('collect', (reaction, user) => {
            if(user === client.user) return
            switch (reaction.emoji.name){
                case '🔒':
                    channel.updateOverwrite(message.author, {SEND_MESSAGES: false});
                    break;
                case '⛔':
                    channel.send('Deleting the ticket in 5 seconds');
                    setTimeout(() => channel.delete(), 5000);
                    break;
            }
        });
        message.channel.send(`We will be right with you, Please refer to ${channel}`).then((msg) => {
            setTimeout(() => msg.delete(), 5000);
            setTimeout(() => message.delete(), 3000);
        }).catch ((err) => {
            throw err;
        });
    },
};