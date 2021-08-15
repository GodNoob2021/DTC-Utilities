const warnModel = require('../../models/warnSchema');

module.exports = {
    name: 'warn',
    aliases: ["clearwarns", "removewarn", "delwarn", "warns"],
    permissions: ['MANAGE_MESSAGES'],
    cooldown: 2,
    description: 'Warn a user',
    async execute(client, message, cmd, args, Discord){
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const PREFIX = process.env.PREFIX
        let messageArgs = message.content.substring(PREFIX.length).split(" ");
        const reason = messageArgs.slice(2).join(' ');
        let warnData = await warnModel.findOne({ guildID: message.guild.id, userID: user.id })
        if(!user) return message.channel.send("User was not found in the server");
        if(user.id === '596316252658466816') return message.channel.send("I cannot warn my master. So my master also does not have any warnings.");
        if(cmd === 'warn'){
            try{
                if(!warnData){
                    if(reason){
                        warnData = await warnModel.create({
                            userID: user.id,
                            guildID: message.guild.id,
                            content: [
                                {
                                    moderator: message.author.id,
                                    reason: reason
                                }
                            ]
                        });
                        const userEmbedNoReason = new Discord.MessageEmbed()
                            .setTitle(message.guild.name)
                            .addFields({ name: "You were warned", value: "Reason: Undefined" })
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter("Try not to do it again :)");
                        const channelEmbedNoReason = new Discord.MessageEmbed()
                            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
                            .addFields({ name: "User was warned", value: "Reason: Undefined"})
                            .setColor('BLUE')
                            .setTimestamp()
                            .setFooter('Have a nice day :)');
                        user.send(userEmbedNoReason)
                        message.channel.send(channelEmbedNoReason)
                    }else {
                        warnData = await warnModel.create({
                            userID: user.id,
                            guildID: message.guild.id,
                            content: [
                                {
                                    moderator: message.author.id,
                                    reason: "Undefined"
                                }
                            ]
                        });
                        warnData.content.push(obj)
                        const userEmbed = new Discord.MessageEmbed()
                            .setTitle(message.guild.name)
                            .addFields({ name: "You were warned", value: `Reason: ${reason}` })
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter("Try not to do it again :)");
                        const channelEmbed = new Discord.MessageEmbed()
                            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
                            .addFields({ name: "User was warned", value: `Reason: ${reason}`})
                            .setColor('BLUE')
                            .setTimestamp()
                            .setFooter('Have a nice day :)');
                        user.send(userEmbed)
                        message.channel.send(channelEmbed)
                    }
                }else {
                    if(reason){
                        const obj = {
                            moderator: message.author.id,
                            reason: reason
                        }
                        warnData.content.push(obj)
                        const userEmbed = new Discord.MessageEmbed()
                            .setTitle(message.guild.name)
                            .addFields({ name: "You were warned", value: `Reason: ${reason}` })
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter("Try not to do it again :)");
                        const channelEmbed = new Discord.MessageEmbed()
                            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
                            .addFields({ name: "User was warned", value: `Reason: ${reason}`})
                            .setColor('BLUE')
                            .setTimestamp()
                            .setFooter('Have a nice day :)');
                        user.send(userEmbed)
                        message.channel.send(channelEmbed)
                    }else {
                        const obj1 = {
                            moderator: message.author.id,
                            reason: "Undefined"
                        }
                        warnData.content.push(obj1)
                        const userEmbedNoReason = new Discord.MessageEmbed()
                            .setTitle(message.guild.name)
                            .addFields({ name: "You were warned", value: "Reason: Undefined" })
                            .setColor('RED')
                            .setTimestamp()
                            .setFooter("Try not to do it again :)");
                        const channelEmbedNoReason = new Discord.MessageEmbed()
                            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
                            .addFields({ name: "User was warned", value: "Reason: Undefined"})
                            .setColor('BLUE')
                            .setTimestamp()
                            .setFooter('Have a nice day :)');
                        user.send(userEmbedNoReason)
                        message.channel.send(channelEmbedNoReason)
                    }
                }
                warnData.save();
            }catch(err){
                console.log(err)
            }
        }
        if(cmd === 'clearwarns'){
            if(!message.author.hasPermission('ADMINISTRATOR')) return message.channel.send('Missing the following permissions: `ADMINISTRATOR`');
            try{
                if(!warnData) return message.channel.send('User does not have any warnings yet');
                if(warnData){
                    await warnModel.findOneAndDelete({ guildID: message.guild.id, userID: user.id });
                }
            }catch (err){
                console.log(err)
            }
            message.channel.send(`Deleted all the warns of ${user.tag}`);
        }
        if(cmd === 'removewarn' || cmd === 'delwarn'){
            if(!message.author.hasPermission('ADMINISTRATOR')) return message.channel.send('Missing the following permissions: `ADMINISTRATOR`');
            try{
                if(!warnData) return message.channel.send('User does not have any warnings yet');
                if(warnData){
                    let number = parseInt(args[1]) -1
                    warnData.content.splice(number, 1)
                    warnData.save();
                }
            }catch (err){ 
                console.log(err)
            }
            message.channel.send('The warning was removed successfully');
        }
        if(cmd === 'warns'){
            try{
                if(!warnData) return message.channel.send('User has not been warned yet');
                if(warnData.content.length){
                    const warnsEmbed = new Discord.MessageEmbed()
                        .setTitle(`${user.tag}'s warns`)
                        .setDescription( 
                            warnData.content.map(
                                (w, i) =>
                                `\`${i + 1}\` | Moderator: ${message.guild.members.cache.get(w.moderator).user.tag}\n Reason: ${w.reason}`
                            )
                        )
                        .setColor('PURPLE');
                        message.channel.send(warnsEmbed);
                    }
                }catch(err){
                    console.log(err)
            }
        }
    }
}