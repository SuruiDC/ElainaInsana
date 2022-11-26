const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
    let channel = message.mentions.channels.first()
    if(!channel) return message.channel.cend("Menciona el canal que quieres establecer como el de alianzas.")
    if(channel === undefined || !["news", "text"].some(x => channel.type === x)) return message.channel.cend("El canal a establecer debe ser de texto.")
    let anti = message.guild.channels.cache.find(a => a.id === channel.id)
    if(!anti) return message.channel.cend("No se encontro ese canal en este servidor.")
    let permissions = channel.permissionsFor(message.guild.me).toArray()
    if(!permissions.includes("SEND_MESSAGES")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("VIEW_CHANNEL")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")

    var data = await bot.guildsData.findOne({guild: message.guild.id})
    await data.updateOne({"allysets.channelAllyID": channel.id})
    message.channel.cend(`Se establecio <#${channel.id}> como canal de alianzas.`)

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "setchannel",
    description: "Establece un canal para el sistema de alianzas.", 
    usage: "e!setchannel #channel",
    cooldown: 5
}