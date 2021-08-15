module.exports = {
    name: 'verify',
    permissions: [],
    cooldown: 0,
    description: 'Verify command',
    execute(client, message, args){
    let welcomeRole = guildMember.guild.roles.cache.find(r => r.name === 'Member');
    let extraRole1 = guildMember.guild.roles.cache.find(r => r.name.includes('server'));
    let extraRole2 = guildMember.guild.roles.cache.find(r => r.name.includes('rank'));
    let extraRole3 = guildMember.guild.roles.cache.find(r => r.name.includes('self'));
        if(message.member.roles.cache.has(welcomeRole)){
            message.channel.send('You are already verified!!')
        }else {
            message.channel.send('I see you are not verified, Let me change that!');
            guildMember.roles.add(welcomeRole);
            guildMember.roles.add(extraRole1);
            guildMember.roles.add(extraRole2);
            guildMember.roles.add(extraRole3);
        }
    }
}
// if(message.member.roles.cache.some(r => r.name ==="ROLE_NAME"))  || For getting the role by the name.
// let role = message.guild.roles.cache.find(r => r.name ==="ROLE_NAME") || To add a role by the name.
// if (message.member.permissions.has('PERMISSION')) || To Check permissions of anyone