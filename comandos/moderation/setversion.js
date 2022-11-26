module.exports.run = async (bot, message, args) => {

    if(message.author.id !== "618634689204322314") return message.channel.cend("Solo mi creador puede usar este comando.")
    let data = await bot.summoner.findOne({bot: bot.user.id})
    let version = args[0]
    if(!version) return message.channel.cend("Especifica la versión.")
    await data.updateOne({version: version})
    message.channel.cend(`Se actualizo la versión a ${version}`)
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "setversion",
    description: "Establece la versión de League Of Legends.", 
    usage: "e!setversion [Versión]",
    cooldown: 5
}