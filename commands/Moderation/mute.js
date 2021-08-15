const ms = require('ms')
module.exports = {
    name: 'mute',
    aliases: ["unmute", "tempmute"],
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    cooldown: 3,
    description: 'mutes the member mentioned',
    execute(client, message, cmd, args){
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
            const member = message.mentions.users.first();
            if(member) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'Member')
                let muteRole = message.guild.roles.cache.find(role => role.name === 'muted')
                let memberTarget = message.guild.members.cache.get(member.id);

                if(memberTarget.id != "596316252658466816") {
                    if(cmd === "mute") {
                        if(args[1]){
                            memberTarget.roles.remove(mainRole);
                            memberTarget.roles.add(muteRole);
                            message.channel.send(`${memberTarget} has been muted for ${ms(ms(args[1]))}`);
                            setTimeout(function () {
                                memberTarget.roles.add(mainRole);
                                memberTarget.roles.remove(muteRole);
                            }, ms(args[1]));
                        }else {
                            memberTarget.roles.remove(mainRole);
                            memberTarget.roles.add(muteRole);
                            message.channel.send(`${memberTarget} has been muted!`);
                            return
                        }
                    }
                    if(cmd === "tempmute"){
                        if(!args[1]){
                            message.channel.send("Please specify a time to mute")
                        }else{
                            memberTarget.roles.remove(mainRole);
                            memberTarget.roles.add(muteRole);
                            message.channel.send(`${memberTarget} has been muted for ${ms(ms(args[1]))}`);
                            setTimeout(function () {
                                memberTarget.roles.add(mainRole);
                                memberTarget.roles.remove(muteRole);
                            }, ms(args[1]));
                        }
                    }
                    if(cmd === "unmute"){
                        memberTarget.roles.add(mainRole);
                        memberTarget.roles.remove(muteRole);
                        message.channel.send(`${memberTarget} has been unmuted!`);
                        return
                    }
                }else {
                    message.channel.send("Sorry, But I cannot ban my master")
                }
            }else {
                message.reply('Member was not found in the server');
            }
        }else {
            message.reply('You do not have permission to mute/unmute members');
        }
    }
}