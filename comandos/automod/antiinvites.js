const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

     if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("Requieres de los permisos de `Gestionar Sevidor` para activar el anti invites.")
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    let asd = args[0]
    if(!asd) return message.channel.send("Escribe después del comando `on` o `off` para activarlo o desactivarlo.")
    if(asd === "on"){
        await data.updateOne({"automod.anti1": "on"})
        message.channel.send("El sistema de anti invites ha sido activado.")
    }

    if(asd === "off"){
        await data.updateOne({"automod.anti1": null})
        message.channel.send("El sistema de anti invites ha sido desactivado.")
    }
    
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "antiinvites",
    description: "Activa el sistema de `Anti Invitaciones`.", 
    usage: "e!antiinvites [`on` or `off`]",
    cooldown: 5
}