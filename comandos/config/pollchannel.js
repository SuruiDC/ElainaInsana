const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para poder establecer el canal de encuestas.")
    
    let pChannel = message.mentions.channels.first();

    if(!pChannel) return message.channel.cend(`Menciona un canal.`)
    if(pChannel === undefined || !["GUILD_NEWS", "GUILD_TEXT"].some(x => pChannel.type === x)) return message.channel.cend("El canal a establecer debe se de texto.")
    let jChannel = message.guild.channels.cache.find(c => c.id === pChannel.id)
    if(!jChannel) return message.channel.cend(`No se encontro ese canal en este servidor.`)
    let permissions = jChannel.permissionsFor(message.guild.me).toArray()
    if(!permissions.includes("SEND_MESSAGES")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("EMBED_LINKS")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    if(!permissions.includes("VIEW_CHANNEL")) return message.channel.cend("Necesito tener estos permisos: `VIEW_CHANNEL`,`SEND_MESSAGES`,`EMBED_LINKS`, para usar ese comando.")
    var data = await bot.guildsData.findOne({guild: message.guild.id})

    await data.updateOne({"config.poll": pChannel.id})
    message.channel.cend(`Se ha establecido como canal de encuestas <#${pChannel.id}>`)

}

exports.conf = {
    aliases: []
};
    exports.help = {
    name: "poll-setchannel",
    description: "Establece el canal de encuentas para el comando `e!poll`.", 
    usage: "e!poll-setchannel #channel",
    cooldown: 5
}