module.exports = {
    name: 'kick',
    permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
    cooldown: 5,
    description: 'Kicks the member mentioned',
    execute(client, message, args){
            const member = message.mentions.users.first();
            if(member) {
                const memberTarget = message.guild.members.cache.get(member.id);
                if(memberTarget.id != "596316252658466816") {
                    memberTarget.kick();
                    message.channel.send(`${memberTarget} has been kicked`);
                }else {
                    message.channel.send("Sorry, But I cannot kick my master")
                }
            }else {
                message.reply('Member was not found in the server');
            }
    }
}