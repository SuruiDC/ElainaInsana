const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {
    
    if(!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para poder establecer el canal de sugerencias.")
    let sChannel = message.mentions.channels.first();

    if(!sChannel) return message.channel.cend(`Menciona un canal.`)
    if(sChannel === undefined || !["GUILD_NEWS", "GUILD_TEXT"].some(x => sChannel.type === x)) return message.channel.cend("El canal a establecer debe se de texto.")
    let jChannel = message.guild.channels.cache.find(c => c.id === sChannel.id)
    if(!jChannel) return message.channel.cend(`No se encontro ese canal en este servidor.`)

    let permissions = jChannel.permissionsFor(message.guild.me).toArray()
    if(!permissions.includes("SEND_MESSAGES")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("VIEW_CHANNEL")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")

    var data = await bot.guildsData.findOne({guild: message.guild.id})

    await data.updateOne({"config.suggest": sChannel.id})
    message.channel.cend(`Se ha establecido como canal de sugerencias <#${sChannel.id}>`)
}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "suggest-setchannel",
    description: "Establece el canal de sugerencias.", 
    usage: "e!suggest-setchannel #channel",
    cooldown: 5
}