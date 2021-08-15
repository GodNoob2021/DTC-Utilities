module.exports = async (client) =>{
    const guild = client.guilds.cache.get('693131409564631151');
    setInterval(() => {
        const memberCount = guild.memberCount;
        const memberChannel = guild.channels.cache.get('861331096516034591');
        memberChannel.setName(`Total Members: ${memberCount.toLocaleString()}`);
    }, 60000);
}