const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'beg',
    aliases: [],
    permissions: [],
    description: 'Beg to peoples for money',
    async execute(client, message, cmd, args, Discord, profileData){
        const godNoobShards = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        const randomShards = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag + " Just begged", message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`You just got **§${randomShards}**`)
            .setColor('3550c7')
            .setTimestamp()
            .setFooter('Have a nice day :)');
        const godNoobEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag + " Just begged", message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`You just got **§${godNoobShards}**`)
            .setColor('RED')
            .setTimestamp()
            .setFooter('Have a nice day :)');

        if(message.author.id != '596316252658466816') {
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                }, {
                    $inc: {
                        trading_Shards: randomShards
                    }
                }
            );
            return message.channel.send(embed)
        } else {
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                }, {
                    $inc: {
                        trading_Shards: godNoobShards
                    }
                }
                );
            return message.channel.send(godNoobEmbed)
        }
    },
};