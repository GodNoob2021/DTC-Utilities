// const profileModel = require('../../models/profileSchema');
const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
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

}