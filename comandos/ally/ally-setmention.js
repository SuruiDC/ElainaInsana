const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.cend("Requieres del permiso de `Gestionar Servidor` para usar este comando.")
    let asd = args[0]
    let opciones = [
        "enable",
        "disable"
    ]
    if(!asd) return message.channel.cend("Escribe después del comando `enable` o `disable` para activar o desactivar las menciones de alianzas.")
    if(!opciones.some(a => asd === a)) return message.channel.cend("Solo puedes escojer entre `enable` o `disable`.")

    var data = await bot.guildsData.findOne({guild: message.guild.id})
    if(asd === "enable"){
        if(!data.allysets.roleMentionAlly) return message.channel.cend("No esta establecido el rol a mencionar en cada alianza.")
        await data.updateOne({"allysets.roleMentionActive": "on"})
        message.channel.cend("Se activo correctamente la menciones en el sistema de alianzas.")
    }
    if(asd === "disable"){
        if(!data.allysets.roleMentionActive) return message.channel.cend("La mención de rol esta desactivada por lo cual no puedes desactivarla.")
        await data.updateOne({"allysets.roleMentionActive": null})
        message.channel.cend("Se desactivo las menciones correctamente.")
    }

}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "setmention",
    description: "Establece la mención en el embed.",
    usage: "e!setmention",
    cooldown: 5
}
