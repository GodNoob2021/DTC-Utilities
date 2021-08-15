module.exports = {
    name: 'suggestions',
    permissions: [],
    aliases: ["suggest", "suggestion"],
    description: 'You can make suggestion for something',
    execute(client, message, cmd, args, Discord){
        const channel = message.guild.channels.cache.find(c => c.name === "suggestions");
        if(!channel) return message.channel.send("suggestion channel does not exist")

        let messageArgs = args.join(' ');
        const embed = new Discord.MessageEmbed()
        .setColor('e9c91c')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .addFields({ name:'Suggestion:', value:`${messageArgs}` })
        .setTimestamp()
        .setFooter(`Have a nice day :)`);

        channel.send(embed).then((msg) => {
            msg.react('✅');
            msg.react('❎');
            message.delete();
            message.channel.send(`Suggestion has been made, Check ${channel} to see your suggesetion`);
        }).catch((err) => {
            throw err;
        })
    }
}