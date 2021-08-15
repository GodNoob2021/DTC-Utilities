const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'embed',
    permissions: ["ADMINISTRATOR", "ADD_REACTIONS"],
    cooldown: 0,
    description: 'Makes an embed',
    execute(client, message, args, Discord){
        const newEmbed = new MessageEmbed()
        .setColor('#FFFFFF')
        .setTitle('Rules')
        .setURL('https://youtube.com')
        .setDescription('Tryout Embed')
        .addFields(
            {name: "Rule #1", value: "Be Nice"},
            {name: "Rule #1", value: "Be Nice"},
            {name: "Rule #1", value: "Be Nice"},
            {name: "Rule #1", value: "Be Nice"},
            {name: "Rule #1", value: "Be Nice"},
        )
        .setImage('https://cdn.discordapp.com/avatars/856162493750837268/6842cfa26cd07a7571429d8d1ab4b64c.png?size=128')
        .setFooter('Make sure to follow all the rules')
        .setTimestamp()
        .setAuthor('ur Mom')
        .setThumbnail(message.author.displayAvatarURL());

        message.channel.send(newEmbed);
    }   
}