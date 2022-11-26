const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("Requieres de los permisos de `Gestionar Sevidor` para activar el anti links.")
    var data = await bot.guildsData.findOne({guild: message.guild.id})
    let decision = args[0]
    if(!decision) return message.channel.send("Escribe después del comando `on` o `off` para activarlo o desactivarlo.")
    if(decision === "on"){
    await datamod.updateOne({"data.anti2": "on"})
    message.channel.send("El sistema de anti links ha sido activado.")
    }
    if(decision === "off"){
        await datamod.updateOne({"data.anti2": null})
        message.channel.send("El sistema de anti links ha sido desactivado.")
    }
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "antilinks",
    description: "Activa el sistema de `Anti Links`.", 
    usage: "e!antilinks [`on` or `off`]",
    cooldown: 5
}