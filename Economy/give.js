const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'give',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: 'Give peoples a amount of shards',
    async execute(client, message, cmd, args, Discord, profileData){
        if(message.author.id != '596316252658466816')
        if(!args.length) return message.channel.send('You need to mention a player to give them coins');
        const amount = args[1];
        const target = message.mentions.users.first();
        if(!amount) return message.channel.send('Please enter a amount to give');
        if(!target) return message.channel.send('User does not exist in the server');
        if (amount % 1 != 0 || amount <= 0) return message.channel.send('Please withdraw using whole numbers');
        try {
            const targetData = await profileModel.findOne({ userID: target.id });
            if(!targetData) return message.channel.send('The User does not have an account')
            await profileModel.findOneAndUpdate(
                {
                    userID: target.id,
                }, {
                    $inc: {
                        trading_Shards: amount,
                    },
                }
            );

            return message.channel.send(`Successfully added **§${amount}** to the ${target}'s balance`)
        } catch (err) {
            console.log(err)
        }
    },
};