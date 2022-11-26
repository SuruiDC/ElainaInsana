const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
    let role = message.mentions.roles.first()
    if(!role) return message.channel.cend("Menciona el rol de staff de alianzas.")
    let anti = message.guild.roles.cache.find(a => a.id === role.id)
    if(!anti) return message.channel.cend("No se encontro ese rol en este servidor.")

    var data = await bot.guildsData.findOne({guild: message.guild.id})
    await data.updateOne({roleStaffAlly: role.id})
    message.channel.cend(`Se establecio como staff de alianzas el rol <@&${role.id}>`)

}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "setstaff",
    description: "Estable un rol de staff para las alianzas.", 
    usage: "e!setstaff @role",
    cooldown: 5
}