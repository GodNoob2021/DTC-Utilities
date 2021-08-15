// const profileModel = require('../../models/profileSchema');

// module.exports = async(client, Discord, member) => {
//     let profileData = await profileModel.find()
//     if(!profileData) return
//     if(profileData){
//         await profileModel.findOneAndDelete({ userID: member.id, serverID: member.guild.id})
//     }
// }