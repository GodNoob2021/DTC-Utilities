const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client({partials : ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"]});
const fs = require('fs');
const memberCounter = require('./counters/members');
const mongoose = require('mongoose');


client.commands = new Discord.Collection();

['command_handler'].forEach(handler =>{
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

client.on('ready', () => {
    console.log('The bot is ready');
})

client.on('message', async message => {
    // const profileModel = require('../../models/profileSchema');
    const cooldowns = new Map();
    const prefix = process.env.PREFIX;

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // let profileData;
    // try{
    //     profileData = await profileModel.findOne({ userID: message.author.id })
    //     if(!profileData){
    //         let profile = await profileModel.create({
    //             userID: message.author.id,
    //             serverID: message.guild.id,
    //             trading_Shards: 0,
    //             bank: 0
    //         });
    //         profile.save();
    //     }
    // }catch(err){
    //     console.log(err)
    // }

    let args = message.content.substring(prefix.length).split(" ");
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    const validPermisions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    if (!command) return

    if(command.permissions.length){
        let invalidPerms = []
        for(const perm of command.permissions){
            if(!validPermisions.includes(perm)){
                return console.log(`Invalid perms ${perm}`)
            }

            if(!message.member.hasPermission(perm)){
                invalidPerms.push(perm)
            }
        }
        if (invalidPerms.length){
            return message.channel.send(`Missing the following permissions \` ${invalidPerms} \` `)
        }
    }

    if(command.cooldown) {
        if(!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
    
        const current_Time = Date.now();
        const time_Stamps = cooldowns.get(command.name);
        const cooldown_Amount = (command.cooldown) * 1000;
    
        if(time_Stamps.has(message.author.id)) {
            const expiration_Time = time_Stamps.get(message.author.id) + cooldown_Amount;
    
            if(current_Time < expiration_Time) {
                const time_Left = (expiration_Time - current_Time) / 1000;
    
                return message.reply(`Please wait ${time_Left.toFixed(1)}s, To use **${command.name}** again`)
            }
        }
    
        time_Stamps.set(message.author.id, current_Time);
        setTimeout(() => time_Stamps.delete(message.author.id), cooldown_Amount);
    }

    try {
        command.execute(client, message, cmd, args, Discord); //profileData
    } catch (err) {
        message.channel.send('An error occurred while executing this command');
        console.log(err);
    }

});
client.on('guildMemberAdd', async member => {
    const ruleChannel = member.guild.channels.cache.find(rules => rules.name === 'rules')
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    const guild = client.guilds.cache.get('693131409564631151');
    const profileModel = require('../../models/profileSchema');
    const notVerified = member.guild.roles.cache.find(r => r.name === 'Not Verified');
    let welcomeEmbed = new Discord.MessageEmbed()
    welcomeEmbed.addFields({
        name:`Greetings,`, value:`Welcome to ${guild.name} Please make sure read all the ${ruleChannel} and understand them. If you are having any problems with understanding the rules or the anything please make sure to contact our moderaters so that they can help you. Have Fun`
    })
    welcomeEmbed.setDescription(member)
    welcomeEmbed.setColor('RANDOM')
    welcomeEmbed.setFooter(`Have a nice day :)`)
    welcomeEmbed.setThumbnail(member.user.displayAvatarURL())
    welcomeEmbed.setTimestamp()
    welcomeEmbed.setTitle(guild.name);
    welcomeEmbed.setImage('https://flic.kr/p/2mboG6D')

    if (!channel) return;
    if(notVerified){
        member.roles.add(notVerified)
    }
    channel.send(welcomeEmbed);

    // let profile = await profileModel.create({
    //     userID: member.id,
    //     serverID: member.guild.id,
    //     trading_Shards: 0,
    //     bank: 0
    // });
    // profile.save();
});
client.on('guildMemberRemove', async member => {
    const profileModel = require('../../models/profileSchema');
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');

    channel.send(`${member.user.tag} Just left`);

    // let profileData = await profileModel.find()
    // if(!profileData) return
    // if(profileData){
    //     await profileModel.findOneAndDelete({ userID: member.id, serverID: member.guild.id})
    // }
});


client.login(process.env.DISCORD_TOKEN);
