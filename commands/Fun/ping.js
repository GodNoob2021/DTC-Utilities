module.exports = {
    name: 'ping',
    aliases: ['yo', 'hello', 'baka'],
    permissions: [],
    cooldown: 5,
    description: 'This is a ping command!',
    execute(client, message, cmd, args){
        if(cmd === 'ping') {
            message.channel.send('Pong!')            
        }
        if(cmd === 'yo') {
            message.channel.send('Yo!')
        }
        if(cmd === 'hello') {
            message.channel.send('Hello!')
        }
        if(cmd === 'baka') {
            message.channel.send('No u!!')
        }
    }
}