const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'withdraw',
    aliases: ['with'],
    permissions: [],
    description: 'Withdraw shards from the bank',
    async execute(client, message, cmd, args, Discord, profileData) {
        const amount = args[0];
        if (amount % 1 != 0 || amount <= 0) return message.channel.send('Please withdraw using whole numbers');
        try {
            if (amount > profileData.bank) return message.channel.send('You dont have enough shards to deposite');
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id
                }, {
                    $inc: {
                        trading_Shards: amount,
                        bank: -amount,
                    }
                }
            );
            
            return message.channel.send(`Successfully withdrawed **§${amount}** from the bank`)
        } catch (err) {
            console.log(err) 
        }   
    }
}