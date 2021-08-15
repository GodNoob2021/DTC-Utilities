const ms = require('ms')
module.exports = {
    name: 'ban',
    aliases: ["tempban", "softban", "hardban",],
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    cooldown: 5,
    description: 'Bans the member mentioned',
    execute(client, message, cmd, args){
        const member = message.mentions.users.first();
        if(member) {            
            const memberTarget = message.guild.members.cache.get(member.id);
            if(memberTarget.id != "596316252658466816") {
                if(cmd === "ban" || cmd === "hardban"){
                    memberTarget.ban();
                    message.channel.send(`${memberTarget} has been banned`);
                    if(args[1]){
                        memberTarget.ban();
                        message.channel.send(`${memberTarget} has been banned for ${ms(ms(args[1]))}`);
                        setTimeout(function() {
                            guild.members.unban(memberTarget);
                        }, ms(args[1]));
                    }
                }
                if(cmd === "tempban" || cmd === "softban"){
                    if(!args[1]){
                        message.channel.send("Please sepecify a time to temp ban")
                    }else {
                        memberTarget.ban();
                        message.channel.send(`${memberTarget} has been banned for ${ms(ms(args[1]))}`);
                        setTimeout(function() {
                            guild.members.unban(memberTarget);
                        }, ms(args[1]));
                    }
                }
                if(cmd === "softban"){

                }
            }else {
                message.channel.send("Sorry, But I cannot ban my master")
            }
        }else {
            message.reply('Member was not found in the server');
        }
    }
}