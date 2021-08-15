const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    permissions: [],
    description: 'Deposit shards to the bank',
    async execute(client, message, cmd, args, Discord, profileData) {
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send('Please deposit using whole numbers');
        try {
            if (amount > profileData.trading_Shards) return message.channel.send('You dont have enough shards to deposit');
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id
                }, {
                    $inc: {
                        trading_Shards: -amount,
                        bank: amount,
                    }
                }
            );

            return message.channel.send(`Successfully deposited **§${amount}** to the bank`)
        } catch (err) {
            console.log(err) 
        }   
    }
}