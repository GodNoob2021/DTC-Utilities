module.exports = {
    name: 'clear',
    permissions: [],
    cooldown: 3,
    description: 'Clears messages',
    async execute(client, message, args){
        if(!args[0]) return message.reply('Please enter the amount of message you want to clear');
        if(isNaN(args[0])) return message.reply('Please enter a real number');

        if(args[0] > 100) return message.reply('You cannot delete more than 100 message at once');
        if(args[0] < 1) return message.reply('You delete atleast one message');

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
            message.reply(`${args[0]} messages have been deleted`);
        });
    }
}