const profileModel = require('../../models/profileSchema')

module.exports = {
    name: 'search',
    aliases: [],
    permissions: [],
    description: 'Search around for money',
    async execute(client, message, cmd, args, Discord, profileData){
        const locations = [
            "car",
            "discord",
            "shoes",
            "sidewalk",
            "bed",
            "fridge",
            "pillow",
            "shower",
            "pudding",
            "e-wallet",
            "bucket",
            "dresser",
            "cabinet",
            "water bottle",
            "basement",
            "bank",
            "vents",
            "pockets",
            "park"
        ];
        const chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);
        const filter = ({ author, content }) =>
            message.author == author && chosenLocations.some((location) => location.toLowerCase() == content.toLowerCase());
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 10000 });
        const randomShards = Math.floor(Math.random() * (600 - 200 + 1)) + 200;
        const godNoobShards = Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;

        collector.on('collect', async (n) => {
            if(message.author.id != "596316252658466816") {
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    }, {
                        $inc: {
                            trading_Shards: randomShards,
                        }
                    }
                    );
                return message.channel.send(`You just found **§${randomShards}**`)
            } else {
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    }, {
                        $inc: {
                            trading_Shards: godNoobShards,
                        }
                    }
                    );
                return message.channel.send(`You just found **§${godNoobShards}**`)
            }
        });

        collector.on('end', (collected, reason) => {
            if(reason === "time") {
                message.channel.send("You ran out of time")
            }
        });

        message.channel.send(`Which location do you want to search \n Type the location name in the channel \n \`${chosenLocations.join('` `')}\``);
    }
}