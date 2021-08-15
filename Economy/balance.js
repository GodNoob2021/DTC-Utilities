module.exports = {
    name: 'balance',
    aliases: ['bal', 'bl', 'wallet', 'wal'],
    permissions: [],
    description: 'Check how much balance you got',
    execute(client, message, cmd, args, Discord, profileData){
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag + "'s balance", message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Trading Shards: ${profileData.trading_Shards}\n Bank: ${profileData.bank}`)
        .setColor('3550c7')
        .setTimestamp()
        .setFooter(`Have a nice day :)`);
        
        message.channel.send(embed)
    }
}