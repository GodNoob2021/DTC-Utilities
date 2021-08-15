const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'reactionrole',
    permissions: [],
    cooldown: 5,
    description: 'Sets up a basic basic reaction role message',
    async execute(client, message, args, Discord){
        const channel = message.mentions.channels.first() || message.channel;
        if(!channel) {
            message.channel.send("Please mention a channel to send the reaction role message")
        }

        if(args[2] === "test"){

            const purpleRole = message.guild.roles.cache.find(role => role.name === 'purple');
            const yellowRole = message.guild.roles.cache.find(role => role.name === 'yellow');
            const greenRole = message.guild.roles.cache.find(role => role.name === 'green');
            const blueRole = message.guild.roles.cache.find(role => role.name === 'blue');
    
            const purpleEmoji = '🥵'
            const yellowEmoji = '🤬'
            const greenEmoji = '👾'
            const blueEmoji = '💩'
    
            let embed = new MessageEmbed()
            .setColor('#f23f3f')
            .setTitle(message.guild.name)
            .setDescription('React below to get the roles you would like \n\n'
                + `${purpleEmoji} for purple \n`
                + `${yellowEmoji} for yellow \n`
                + `${greenEmoji} for green \n`
                + `${blueEmoji} for blue`);
    
            let messageEmbed = await message.channel.send(embed)
            messageEmbed.react(purpleEmoji);
            messageEmbed.react(yellowEmoji);
            messageEmbed.react(greenEmoji);
            messageEmbed.react(blueEmoji);
        }else {
            message.channel.send("Please specify a type of reaction role")
        }

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id = channel) {
                if (reaction.emoji.name === purpleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(purpleRole);
                }
                if (reaction.emoji.name === yellowEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowRole);
                }
                if (reaction.emoji.name === greenEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(greenRole);
                }
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueRole);
                }
            }else {
                return;
            }
        });
        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id = channel) {
                if (reaction.emoji.name === purpleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(purpleRole);
                }
                if (reaction.emoji.name === yellowEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowRole);
                }
                if (reaction.emoji.name === greenEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(greenRole);
                }
                if (reaction.emoji.name === blueEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueRole);
                }
            }else {
                return;
            }
        });
    }
}