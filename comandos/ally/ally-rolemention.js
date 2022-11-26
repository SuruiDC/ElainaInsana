const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
    let role = message.mentions.roles.first();
    if(!role) return message.channel.cend("Debes mencionar un rol.")
    let anti = message.guild.roles.cache.find(a => a.id === role.id)
    if(!anti) return message.channel.cend("No se encontro ese rol en este servidor.")
    
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    await data.updateOne({"allysets.roleMentionAlly": role.id})
    message.channel.cend(`Se establecio ${role} como rol de mención de alianzas.`)

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "mentionrole",
    description: "Establece un rol de mención en las alianzas.",
    usage: "e!mentionrole @role",
    cooldown: 5
}
