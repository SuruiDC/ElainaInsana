const { Types } = require("mongoose")
module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.cend("Requieres del permiso de `Administrador` para usar este comando.")
    var data = await bot.guildsData.findOne({guild: message.guild.id})

    await data.updateOne({"config.prefix": null})
    message.channel.cend("Se reestablecio el prefix del servidor al predeterminado **e!**.")
}
exports.conf = {
    aliases: ["rp"]
};
    exports.help = {
    name: "resetprefix",
    description: "Resetea el prefix a el determinado por Elaina.", 
    usage: "e!resetprefix",
    cooldown: 5
}