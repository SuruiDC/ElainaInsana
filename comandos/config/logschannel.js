const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    let lChannel = message.mentions.channels.first();

    if(!lChannel) return message.channel.cend(`Menciona un canal.`)

    if(!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para poder establecer el canal de logs.")
    if(lChannel === undefined || !["GUILD_NEWS", "GUILD_TEXT"].some(x => lChannel.type === x)) return message.channel.cend("El canal a establecer debe se de texto.")
    let jChannel = message.guild.channels.cache.find(c => c.id === lChannel.id)
    if(!jChannel) return message.channel.cend(`No se encontro ese canal en este servidor.`)

    let permissions = jChannel.permissionsFor(message.guild.me).toArray()
    if(!permissions.includes("SEND_MESSAGES")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("VIEW_CHANNEL")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    var data = await bot.guildsData.findOne({guild: message.guild.id})

    await data.updateOne({"config.logs": lChannel.id})
    message.channel.cend(`Se ha establecido como canal de logs <#${lChannel.id}>`)
    
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "logs-setchannel",
    description: "Establece el canal de logs para los comandos de la categoría de `Moderación`.", 
    usage: "e!logs-setchannel #channel",
    cooldown: 5
}