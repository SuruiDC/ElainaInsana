const { Util }= require("discord.js")

module.exports.run = async (bot, message, args) => {

    if (!args[0]) return message.channel.cend("Especifica un emoji.")
    var emoji = Util.parseEmoji(args[0]);
    if(!emoji.id) return message.channel.cend("Emoji invalido.");
    message.channel.cend(`https://cdn.discordapp.com/emojis/${emoji.id}.${(emoji.animated ? 'gif': 'png')}`)
}
exports.conf = {
    aliases: ['jb']
};
    exports.help = {
    name: "jumbo",
    description: "Obten un emoji personalizado de discord en su formato.", 
    usage: "e!jumbo [emoji]",
    cooldown: 3
}