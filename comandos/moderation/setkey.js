module.exports.run = async (bot, message, args) => {

    if(message.author.id !== "618634689204322314") return message.channel.cend("Solo mi creador puede usar este comando.")
    let data = await bot.summoner.findOne({bot: bot.user.id})
    let key = args[0]
    if(!key) return message.channel.cend("Especifica la key.")
    await data.updateOne({key: key})
    message.channel.cend("Se actualizo la api key.")
    message.delete()
}
exports.conf = {
    aliases: []
};
    exports.help = {
    name: "setkey",
    description: "Establece la key de riot games.", 
    usage: "e!setkey [Key]",
    cooldown: 5
}