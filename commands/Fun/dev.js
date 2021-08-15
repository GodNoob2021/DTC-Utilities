module.exports = {
    name: 'dev',
    permissions: [],
    cooldown: 0,
    description: 'Send information about developers',
    execute(client, message, args){
        if(message.author.id != "596316252658466816") {
            message.channel.send("My master is GodNoob!")
        }else {
            message.channel.send("It's You Master")
        }
    }
}