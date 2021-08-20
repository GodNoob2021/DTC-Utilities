module.exports = {
    name: 'verify',
    permissions: [],
    cooldown: 0,
    description: 'Verify command',
    execute(client, message, args){
        let welcomeRole = message.guild.roles.cache.find(r => r.name === 'Member');
        let extraRole1 = message.guild.roles.cache.find(r => r.name.includes('Server'));
        let extraRole2 = message.guild.roles.cache.find(r => r.name.includes('Rank'));
        let extraRole3 = message.guild.roles.cache.find(r => r.name.includes('Self'));
        if(message.member.roles.cache.has(welcomeRole)){
            message.channel.send('You are already verified!');
        }else{
            message.member.roles.add(welcomeRole);
            message.member.roles.add(extraRole1);
            message.member.roles.add(extraRole2);
            message.member.roles.add(extraRole3);
            message.channel.send('I see you are not verified, Let me change that!');
        }
    }
}
// if(message.member.roles.cache.some(r => r.name ==="ROLE_NAME"))  || For getting the role by the name.
// let role = message.guild.roles.cache.find(r => r.name ==="ROLE_NAME") || To add a role by the name.
// if (message.member.permissions.has('PERMISSION')) || To Check permissions of anyone