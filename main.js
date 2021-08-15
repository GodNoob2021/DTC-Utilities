const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({partials : ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"]});
const fs = require('fs');
const memberCounter = require('./counters/members');
const mongoose = require('mongoose')


client.commands = new Discord.Collection();
client.events = new Discord.Collection(); 

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to the database')
}).catch((err) => {
    console.log(err)
});

client.on('guildMemberAdd', async guildMember => {
    const ruleChannel = guildMember.guild.channels.cache.find(rules => rules.name === 'rules')
    const channel = guildMember.guild.channels.cache.find(ch => ch.name === 'welcome');
    const guild = client.guilds.cache.get('693131409564631151');
    let welcomeEmbed = new Discord.MessageEmbed()
    welcomeEmbed.addFields({
        name:`Greetings,`, value:`Welcome to ${guild.name} Please make sure read all the ${ruleChannel} and understand them. If you are having any problems with understanding the rules or the anything please make sure to contact our moderaters so that they can help you. Have Fun`
    })
    welcomeEmbed.setDescription(guildMember)
    welcomeEmbed.setColor('RANDOM')
    welcomeEmbed.setFooter(`Have a nice day :)`)
    welcomeEmbed.setThumbnail(guildMember.user.displayAvatarURL())
    welcomeEmbed.setTimestamp()
    welcomeEmbed.setTitle(guild.name);
    welcomeEmbed.setImage('https://flic.kr/p/2mboG6D')

    if (!channel) return;
    
    channel.send(welcomeEmbed);
});


client.login(process.env.DISCORD_TOKEN);
