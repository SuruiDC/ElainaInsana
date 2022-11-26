const { Types } = require("mongoose")

module.exports.run = async (bot, message, args) => {

    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.cend("Requieres del permiso de `Administrador` para usar este comando.")
    let custom = args[0]
    if(!custom) return message.channel.cend("Especifica el prefix que deseas.")
    if(custom.length > 5) return message.channel.cend("El prefix no puede pasar los 5 caracteres.")
    if(custom.match(/[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug)) return message.channel.send("No puedes establecer un emoji como prefix.")
    if(custom.match(/^[*]|[|]|[`]/g)) return message.channel.send("No se permite poner los siguientes simbolos en el prefix: ` , * , |")   
    var data = await bot.guildsData.findOne({guild: message.guild.id})

    await data.updateOne({"config.prefix": custom})
    message.channel.cend(`Se establecio **${custom}** como prefix del servidor`)
}
exports.conf = {
    aliases: ["sp"]
};
    exports.help = {
    name: "setprefix",
    description: "Establece un nuevo prefix para el servidor.", 
    usage: "e!setprefix [El prefix que deseas]",
    cooldown: 5
}